import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Form.module.css";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function Form({ camper }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !selectedDate) {
      toast.error("bazıları eksik");
      return;
    }
    if (!camper?.id) {
      toast.error("Camper bilgisi eksik");
      return;
    }
    try {
      await api.post("/reservation", {
        camperId: camper.id,
        name,
        email,
        date: selectedDate.toISOString(),
        comment,
      });
      toast.success("Reservation completed successfully ✔");
      setName("");
      setEmail("");
      setSelectedDate(null);
      setComment("");
    } catch (error) {
      console.log({
        camperId: camper?.id,
        name,
        email,
        date: selectedDate,
        comment,
      });

      toast.error("Bir hata oluştu, tekrar deneyin");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={style.form}>
          <div className={style.form_head}>
            <h3>Book your campervan now</h3>
            <span>Stay connected! We are always ready to help you.</span>
          </div>
          <div className={style.form_input_div}>
            <label className={style.form_label}>
              <input
                className={style.form_input}
                type="text"
                name="name"
                value={name}
                placeholder="Name*"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <input
                className={style.form_input}
                type="email"
                name="email"
                value={email}
                placeholder="Email*"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <DatePicker
              className={style.form_input}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Booking date*"
              minDate={new Date()}
            />
            <textarea
              className={style.form_textarea}
              placeholder="Comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className={style.buton_div}>
              <button type="submit" className={style.form_buton}>
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
