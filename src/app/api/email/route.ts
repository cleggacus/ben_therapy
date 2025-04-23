import { contactSchema } from '@/src/lib/schemas/contact';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const data = contactSchema.parse(json);

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ?? "",
      port: parseInt(process.env.EMAIL_PORT ?? "465"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER ?? "",
        pass: process.env.EMAIL_PASS ?? "",
      },
    });

    const currentDateTime = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_SENDER ?? "",
      to: process.env.EMAIL_RECIEVER ?? "",
      subject: `[form] ${data.subject}`,
      html: `
        <h1>New message from the website</h1>
        <pre>
<strong>Name:           </strong> ${data.name}
<strong>Email:          </strong> ${data.email}
<strong>Subject:        </strong> ${data.subject}
<strong>Received on:    </strong> ${currentDateTime}
        </pre>
        <h2>Message</h2>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

