import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Form.module.css";
export default function Form() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <>
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
              placeholder="Name*"
            />
          </label>
          <label>
            <input
              className={style.form_input}
              type="email"
              name="email"
              placeholder="Email*"
            />
          </label>
          <DatePicker
            className={style.form_input}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Booking date*"
          />
          <textarea
            className={style.form_texterea}
            placeholder="Comment"
            name="comment"
          ></textarea>
          <div className={style.buton_div}>
            <button className={style.form_buton}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
