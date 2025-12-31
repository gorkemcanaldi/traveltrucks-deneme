import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campersSlice";
import style from "./Detail.module.css";
import { icons } from "../../constants/icons";
import Reviews from "../../components/Reviews/Reviews";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { itemDetail, loading, error } = useSelector((s) => s.campers);

  useEffect(() => {
    console.log("url id", id);
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata Oluştu: {error}</p>;
  if (!itemDetail) return <p>Ürün bulunamadı.</p>;
  console.log(itemDetail);

  return (
    <>
      <div className={style.detail_page}>
        <h2 className={style.card_title}>{itemDetail.name}</h2>

        <div className={style.card_meta}>
          <div className={style.rating}>
            <img src={icons.star} alt="starIcon" />
            <span>
              {itemDetail.rating} ({itemDetail.reviews.length} reviews)
            </span>
          </div>
          <div className={style.card_location}>
            <img src={icons.map} alt="mapIcon" />
            <span>{itemDetail.location} </span>
          </div>
        </div>
        <h2>€{itemDetail.price} </h2>

        <div className={style.card_image}>
          {itemDetail.gallery && itemDetail.gallery.length > 0 ? (
            itemDetail.gallery.map((img, index) => (
              <img
                key={index}
                width={292}
                height={320}
                className={style.card_img}
                src={img.original}
                alt={`${itemDetail.name} ${index + 1}`}
              />
            ))
          ) : (
            <p>Bu karavana ait fotoğraf bulunamadı.</p>
          )}
        </div>
        <p className={style.description_detail}>{itemDetail.description} </p>

        <Reviews itemDetails={itemDetail} />
      </div>
    </>
  );
}
