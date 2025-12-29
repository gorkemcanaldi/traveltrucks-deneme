import React from "react";
import style from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={style.overlay}>
      <ClipLoader size={80} />
    </div>
  );
}
