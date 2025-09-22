import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"JogKar" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

  } catch (err) {
    console.error("Email error:", err.message);
    throw err;
  }
};
