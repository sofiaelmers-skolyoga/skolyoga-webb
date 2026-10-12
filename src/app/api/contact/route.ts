import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, school, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vänligen fyll i alla obligatoriska fält (namn, e-post och meddelande)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Vänligen ange en giltig e-postadress." },
        { status: 400 }
      );
    }

    const recipient = "hej@skolyoga.se";
    const timestamp = new Date().toISOString();

    // 1. Save inquiry into Firestore collection 'contact_inquiries'
    let docId = null;
    try {
      const docRef = await addDoc(collection(db, "contact_inquiries"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : "",
        school: school ? school.trim() : "",
        subject: subject || "Allmän förfrågan",
        message: message.trim(),
        targetEmail: recipient,
        status: "unread",
        createdAt: timestamp,
        createdAtServer: serverTimestamp(),
      });
      docId = docRef.id;
    } catch (dbError) {
      console.warn("Could not save inquiry to Firestore directly:", dbError);
    }

    // 2. Send email notification directly to hej@skolyoga.se via FormSubmit (No account / no API key required)
    try {
      await fetch("https://formsubmit.co/ajax/hej@skolyoga.se", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "https://skolyoga.se",
          "Referer": "https://skolyoga.se/kontakt",
        },
        body: JSON.stringify({
          _subject: `[Skolyoga Webb] ${subject || "Ny förfrågan"} - ${name}`,
          Namn: name,
          "E-post": email,
          Telefon: phone || "Ej angivet",
          "Skola / Organisation": school || "Ej angivet",
          Ämne: subject || "Allmän förfrågan",
          Meddelande: message,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch (fsErr) {
      console.warn("FormSubmit notification note:", fsErr);
    }

    // 3. Fallback: If RESEND_API_KEY is configured in the environment, also send via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Skolyoga Webb <kontakt@skolyoga.se>",
            to: [recipient],
            reply_to: email.trim(),
            subject: `[Webbkontakt] ${subject || "Ny förfrågan"} - ${name}`,
            text: `Nytt meddelande från webbplatsen:\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone || "Ej angivet"}\nSkola: ${school || "Ej angivet"}\nÄmne: ${subject}\n\nMeddelande:\n${message}\n\nDatum: ${timestamp}`,
          }),
        });
      } catch (mailError) {
        console.warn("Failed sending via Resend API:", mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Tack ${name}! Ditt meddelande har tagits emot och skickats till ${recipient}.`,
      docId,
      recipient,
    });
  } catch (error: any) {
    console.error("Error handling contact submission:", error);
    return NextResponse.json(
      { error: "Ett fel uppstod när meddelandet skulle skickas. Försök igen eller mejla direkt till hej@skolyoga.se." },
      { status: 500 }
    );
  }
}
