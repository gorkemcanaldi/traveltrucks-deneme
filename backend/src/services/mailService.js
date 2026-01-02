import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
});

export const sendReservationMail = async ({
  name,
  email,
  date,
  comment,
  camperId,
}) => {
  try {
    let formattedDate;
    try {
      formattedDate = new Date(date).toISOString();
    } catch {
      formattedDate = date || "Belirtilmedi";
    }

    setImmediate(async () => {
      try {
        const info = await transporter.sendMail({
          from: "gorkem.aldi2003@gmail.com",
          to: process.env.ADMIN_EMAIL,
          replyTo: email,
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
      } catch (err) {
        console.error("Mail hatası:", err);
      }
    });

    return { success: true, message: "Rezervasyon alındı" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
