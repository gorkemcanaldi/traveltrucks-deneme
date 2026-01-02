import React, { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campersSlice";
import style from "./Detail.module.css";
import { icons } from "../../constants/icons";
import Loader from "../../components/Loader/Loader";
import Form from "../../components/Form/Form";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isReviews = location.pathname.includes("reviews");

  const { itemDetail, loading, error } = useSelector((s) => s.campers);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);
  if (loading) return <Loader />;
  if (error) return <p>Hata Oluştu: {error}</p>;
  if (!itemDetail) return <p>Ürün bulunamadı.</p>;

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
        <h2>€{itemDetail.price}.00</h2>
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
        <div className={style.detail_link}>
          <NavLink className={style.detail_nav} to=".">
            Features
          </NavLink>
          <div className={style.detail_buton}>
            <button></button>
          </div>
          <NavLink className={style.detail_nav} to="reviews">
            Reviews
          </NavLink>
          <span
            className={`${style.indicator} ${
              isReviews ? style.reviews : style.features
            }`}
          />
        </div>
        <div className={style.detai_div}>
          <div>
            <Outlet context={{ itemDetail }} />
          </div>

          <Form camper={itemDetail} />
        </div>
      </div>
    </>
  );
}
