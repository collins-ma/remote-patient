import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // you can also use Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function notifyPatientByEmail(email: string, message: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Health Alert: High Blood Pressure",
    text: message,
  });
}