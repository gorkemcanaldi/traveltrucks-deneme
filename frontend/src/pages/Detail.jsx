import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../redux/campersSlice";

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

  return (
    <>
      <div>
        <h1>{itemDetail.name}</h1>
        {itemDetail.gallery && itemDetail.gallery.length > 0 && (
          <img src={itemDetail.gallery[0].original} alt={itemDetail.name} />
        )}
        <p>{itemDetail.description}</p>
      </div>
    </>
  );
}
