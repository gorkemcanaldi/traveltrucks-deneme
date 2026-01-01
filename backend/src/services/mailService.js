import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendReservationMail = async ({
  name,
  email,
  date,
  comment,
  camperId,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 🔑 Tarihi güvenli şekilde formatla
    let formattedDate;
    try {
      formattedDate = new Date(date).toISOString();
    } catch {
      formattedDate = date || "Belirtilmedi";
    }

    const info = await transporter.sendMail({
      from: "gorkem.aldi2003@gmail.com", // ✅ doğrulanmış sender
      to: process.env.ADMIN_EMAIL, // senin admin mailin
      replyTo: email, // formu dolduran kişinin maili
      subject: "Yeni Rezervasyon",
      html: `
    <h3>Yeni Rezervasyon</h3>
    <p><strong>Camper ID:</strong> ${camperId}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Comment:</strong> ${comment || "Yok"}</p>
  `,
    });

    console.log("Mail gönderildi:", info.messageId);
    return { success: true };
  } catch (error) {
    console.log("Mail gönderme hatası:", error);
    return { success: false, message: error.message };
  }
};
