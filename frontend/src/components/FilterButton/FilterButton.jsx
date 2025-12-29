import React from "react";
import style from "./FilterButton.module.css";
export default function FilterButton({ onSearch }) {
  return (
    <button className={style.card_buton} onClick={onSearch}>
      Search
    </button>
  );
}
