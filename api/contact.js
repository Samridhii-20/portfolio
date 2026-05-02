import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { from_name, from_email, message } = req.body;

        if (!from_name || !from_email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
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
            to: 'kunalbothra.work@gmail.com',
            subject: `New Portfolio Message from ${from_name}`,
            text: `You have received a new message from your portfolio website.\n\nName: ${from_name}\nEmail: ${from_email}\n\nMessage:\n${message}`,
            replyTo: from_email,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email. Ensure your EMAIL_USER and EMAIL_PASS are configured.' });
    }
}
