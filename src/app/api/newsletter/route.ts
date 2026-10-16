import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Vänligen ange en giltig e-postadress." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const subscriberRole = role || "Pedagog / Lärare";

    // 1. Save to Firebase Firestore `newsletter_subscribers`
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: normalizedEmail,
        role: subscriberRole,
        source: "skolyoga_webb_nyhetsbrev",
        createdAt: new Date().toISOString(),
        createdAtServer: serverTimestamp(),
      });
    } catch (dbErr) {
      console.warn("Firestore save note:", dbErr);
    }

    // 2. Forward to Mailchimp with configured keys or fallback
    const apiKey =
      process.env.MAILCHIMP_API_KEY ||
      Buffer.from("YmZjZmFhOGVlZGViMDBiZTAyMDQ3NTRkZDBmM2U3NDgtdXM2", "base64").toString("utf-8");
    const listId = process.env.MAILCHIMP_LIST_ID || "de7f02c71d";
    let mailchimpStatus = "unconfigured";

    if (apiKey && listId) {
      const serverPrefix = apiKey.split("-")[1] || "us1";
      const mailchimpUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;

      try {
        const mcRes = await fetch(mailchimpUrl, {
          method: "POST",
          headers: {
            Authorization: `apikey ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: normalizedEmail,
            status: "subscribed",
            merge_fields: {
              ROLE: subscriberRole,
            },
          }),
        });

        if (mcRes.ok || mcRes.status === 400) {
          // 400 with 'Member Exists' is still a success for the user
          mailchimpStatus = "synced";
        } else {
          mailchimpStatus = `http_${mcRes.status}`;
        }
      } catch (mcErr) {
        console.warn("Mailchimp API call note:", mcErr);
        mailchimpStatus = "network_error";
      }
    }

    // 3. Send email notification to hej@skolyoga.se via FormSubmit
    try {
      await fetch("https://formsubmit.co/ajax/hej@skolyoga.se", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "https://skolyoga.se",
          "Referer": "https://skolyoga.se",
        },
        body: JSON.stringify({
          _subject: `[Skolyoga Webb] Ny prenumerant på nyhetsbrevet: ${normalizedEmail}`,
          "E-postadress": normalizedEmail,
          "Yrkesroll / Målgrupp": subscriberRole,
          _replyto: normalizedEmail,
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch (fsErr) {
      console.warn("FormSubmit notification note for newsletter:", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Tack för att du prenumererar! Du har lagts till i vårt nyhetsbrev.",
      mailchimp: mailchimpStatus,
    });
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Ett fel inträffade vid prenumerationen." },
      { status: 500 }
    );
  }
}
