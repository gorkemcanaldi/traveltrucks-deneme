import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Detail() {
  const { id } = useParams();
  const { items } = useSelector((s) => s.campers);

  console.log(items);
  return <div>Detail</div>;
}
