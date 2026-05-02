import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { from_name, from_email, message } = await req.json();

        if (!from_name || !from_email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'samridhichoudhary02@gmail.com',
            subject: `New Portfolio Message from ${from_name}`,
            text: `You have received a new message from your portfolio website.\n\nName: ${from_name}\nEmail: ${from_email}\n\nMessage:\n${message}`,
            replyTo: from_email,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email. Ensure your EMAIL_USER and EMAIL_PASS are configured.' }, { status: 500 });
    }
}
