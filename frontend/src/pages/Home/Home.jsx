import React from "react";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.homePage}>
        <h1 className={style.home_h1}>Campers of your dreams</h1>
        <h2 className={style.home_h2}>
          You can find everything you want in our catalog
        </h2>
        <div>
          <button
            onClick={() => navigate("/catalog")}
            className={style.home_buton}
          >
            View Now
          </button>
        </div>
      </div>
      <div>
        <img className={style.home_Img} src="/home_img.jpg" alt="homePage" />
      </div>
    </>
  );
}
