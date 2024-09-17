import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const { email, name, message, subject } = await request.json();

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST ?? "",
        port: parseInt(process.env.EMAIL_PORT ?? ""),
        secure: process.env.EMAIL_SECURE == "true",
        auth: {
            user: process.env.EMAIL_USER ?? "",
            pass: process.env.EMAIL_PASS ?? "",
        },
    });

    
    const currentDateTime = new Date().toLocaleString("en-GB", {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false
    });

    const mailOptions: Mail.Options = {
        from: process.env.EMAIL_SENDER ?? "",
        to: process.env.EMAIL_RECIEVER ?? "",
        subject: `[form] ${subject}`,
        html: `
    <h1>New message from the website</h1>
    <pre>
<strong>Name:           </strong> ${name}
<strong>Email:          </strong> ${email}
<strong>Subject:        </strong> ${subject}
<strong>Received on:    </strong> ${currentDateTime}
    </pre>
    <h2>Message</h2>
    <p>${message.replace(/\n/g, "<br>")}</p>
        `
    }

    console.log(mailOptions);


    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
