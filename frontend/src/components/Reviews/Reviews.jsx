import React from "react";
import { icons } from "../../constants/icons";
import style from "./Reviews.module.css";

export default function Reviews({ itemDetails }) {
  return (
    <>
      <div className={style.reviews}>
        {itemDetails.reviews?.map((rev, index) => {
          const stars = Array.from({ length: rev.reviewer_rating }, (_, i) => (
            <img
              key={`${index}-${i}`}
              src={icons.star}
              width={16}
              height={16}
              alt="star"
            />
          ));
          return (
            <div key={index} className={style.card}>
              <div className={style.header}>
                <h2 className={style.avatar}>{rev.reviewer_name[0]}</h2>
                <div className={style.info}>
                  <h4 className={style.name}>{rev.reviewer_name}</h4>
                  <div className={style.stars}>{stars}</div>
                </div>
              </div>
              <p className={style.comment}>{rev.comment}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
