import SibApiV3Sdk from "sib-api-v3-sdk";
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
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let formattedDate;
    try {
      formattedDate = new Date(date).toISOString();
    } catch {
      formattedDate = date || "Belirtilmedi";
    }

    let sendSmtpEmail = {
      sender: { email: "no-reply@senindomain.com" },
      to: [{ email: process.env.ADMIN_EMAIL }],
      replyTo: { email },
      subject: "Yeni Rezervasyon",
      htmlContent: `
        <h3>Yeni Rezervasyon</h3>
        <p><strong>Camper ID:</strong> ${camperId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Comment:</strong> ${comment || "Yok"}</p>
      `,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Mail gönderildi:", data);
    return { success: true };
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return { success: false, message: error.message };
  }
};
