import style from "./CamperList.module.css";
import { icons } from "../../constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorites/favoritesSelectors";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { featuresConfig } from "../../constants/featuresConfig";
import { Link } from "react-router-dom";

export default function CampersList({ items }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(items.id);

  return (
    <>
      <div className={style.card}>
        <div className={style.card_image}>
          <img
            className={style.card_img}
            src={items.gallery[0].original}
            alt={items.name}
            width={292}
            height={320}
          />
        </div>
        <div className={style.card_content}>
          <div className={style.card_header}>
            <h2 className={style.card_title}>{items.name}</h2>
            <div className={style.card_price}>
              <h2>€{items.price}.00</h2>
              <img
                src={isFavorite ? "/red-heart.svg" : "/heart.svg"}
                alt="favIcon"
                className={style.heart}
                onClick={() => dispatch(toggleFavorite(items.id))}
                height={24}
                width={24}
              />
            </div>
          </div>
          <div className={style.card_meta}>
            <div className={style.rating}>
              <img src={icons.star} alt="starIcon" />
              <span>
                {items.rating} ({items.reviews.length} reviews)
              </span>
            </div>
            <div className={style.card_location}>
              <img src={icons.map} alt="mapIcon" />
              <span>{items.location} </span>
            </div>
          </div>
          <p className={style.card_desc}>{items.description}</p>
          <div className={style.features}>
            {featuresConfig.map((f) => {
              const value = items[f.key];

              const shouldRender =
                value &&
                (f.type !== "boolean" || value === true) &&
                (f.type !== "conditional" || f.showIf(value));

              if (!shouldRender) return null;

              const text = f.type === "value" ? value : f.label;

              return (
                <div key={f.key} className={style.feature_item}>
                  <img src={f.icon} alt={f.label} width={20} height={20} />
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
          <Link
            to={`/catalog/${items.id}`}
            target="_blank"
            className={style.card_buton}
          >
            Show more
          </Link>
        </div>
      </div>
    </>
  );
}
