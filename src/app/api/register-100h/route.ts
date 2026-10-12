import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      invoiceSchool,
      invoiceAddress,
      invoiceZipCity,
      invoiceReference,
      message,
    } = body;

    // Validation
    if (!name || !email || !phone || !invoiceSchool || !invoiceAddress || !invoiceZipCity) {
      return NextResponse.json(
        {
          error:
            "Vänligen fyll i alla obligatoriska fält (namn, e-post, telefon, samt fullständig faktureringsadress).",
        },
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

    const timestamp = new Date().toISOString();
    const recipient = "hej@skolyoga.se";

    // 1. Save registration in Firestore collection 'course_registrations'
    let docId = null;
    try {
      const docRef = await addDoc(collection(db, "course_registrations"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        invoiceSchool: invoiceSchool.trim(),
        invoiceAddress: invoiceAddress.trim(),
        invoiceZipCity: invoiceZipCity.trim(),
        invoiceReference: invoiceReference ? invoiceReference.trim() : "",
        message: message ? message.trim() : "",
        course: "Skolyogautbildning 100h",
        term: "Hösten 2027",
        status: "pending",
        createdAt: timestamp,
        createdAtServer: serverTimestamp(),
      });
      docId = docRef.id;
    } catch (dbError) {
      console.warn("Could not save to Firestore directly:", dbError);
    }

    // 2. Also save to contact_inquiries for backward compatibility
    try {
      await addDoc(collection(db, "contact_inquiries"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        school: invoiceSchool.trim(),
        subject: "Anmälan Skolyogautbildning 100h (Hösten 2027)",
        message: `Faktureringsadress:\n${invoiceSchool}\n${invoiceAddress}\n${invoiceZipCity}\nRef: ${invoiceReference || "Ingen"}\n\nÖvrigt:\n${message || "Ingen"}`,
        targetEmail: recipient,
        status: "unread",
        createdAt: timestamp,
        createdAtServer: serverTimestamp(),
      });
    } catch (e) {
      // ignore secondary write error
    }

    // 3. Send email notification directly to hej@skolyoga.se via FormSubmit (No account / no API key required)
    try {
      await fetch("https://formsubmit.co/ajax/hej@skolyoga.se", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "https://skolyoga.se",
          "Referer": "https://skolyoga.se/utbildningar/100h/anmalan",
        },
        body: JSON.stringify({
          _subject: `[Skolyoga Webb] Ny kursanmälan 100h - ${name} (${invoiceSchool})`,
          Kurs: "Skolyogautbildning 100h (Hösten 2027)",
          Namn: name,
          "E-post": email,
          Telefon: phone,
          "Fakturaorganisation / Skola": invoiceSchool,
          Faktureringsadress: invoiceAddress,
          "Postnummer & Ort": invoiceZipCity,
          "Referens / Märkning": invoiceReference || "Ej angivet",
          "Övrigt meddelande": message || "Inget meddelande",
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch (fsErr) {
      console.warn("FormSubmit notification error for 100h:", fsErr);
    }

    // 4. Fallback: Send via Resend if API key is present
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
            subject: `[Anmälan 100h] ${name} - ${invoiceSchool}`,
            text: `Ny anmälan till Skolyogautbildning 100h (Hösten 2027):\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\n\nFaktureringsadress:\n${invoiceSchool}\n${invoiceAddress}\n${invoiceZipCity}\nReferens/GLN: ${invoiceReference || "Ej angivet"}\n\nÖvrigt meddelande:\n${message || "Inget meddelande"}\n\nDatum: ${timestamp}`,
          }),
        });
      } catch (mailError) {
        console.warn("Failed sending email via Resend:", mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Tack ${name}! Din anmälan till Skolyogautbildning 100h har tagits emot och skickats till ${recipient}.`,
      docId,
    });
  } catch (error: any) {
    console.error("Error in course registration API:", error);
    return NextResponse.json(
      {
        error:
          "Ett oväntat fel uppstod. Vänligen försök igen eller maila oss direkt på hej@skolyoga.se.",
      },
      { status: 500 }
    );
  }
}
