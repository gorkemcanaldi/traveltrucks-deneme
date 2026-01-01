import { sendReservationMail } from "../services/mailService.js";

export const createReservation = async (req, res) => {
  const { name, email, date, comment, camperId } = req.body;

  if (!name || !email || !date || !camperId) {
    return res.status(400).json({
      success: false,
      message: "Name, email, date ve camperId zorunlu",
    });
  }

  try {
    const result = await sendReservationMail({
      name,
      email,
      date,
      comment,
      camperId,
    });

    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Mail gönderilemedi" });
  }
};
