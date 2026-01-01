import React from "react";
import style from "./Features.module.css";
import { featuresConfig } from "../../constants/featuresConfig";
import { useOutletContext } from "react-router-dom";

export default function Features() {
  const { itemDetail } = useOutletContext();

  const vehDet = [
    { label: "Form", value: itemDetail.form },
    { label: "Length", value: itemDetail.length },
    { label: "Width", value: itemDetail.width },
    { label: "Height", value: itemDetail.height },
    { label: "Tank", value: itemDetail.tank },
    { label: "Consumption", value: itemDetail.consumption },
  ];
  return (
    <>
      <div className={style.features_div}>
        <div className={style.features}>
          {featuresConfig.map((f) => {
            const value = itemDetail[f.key];

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
        <h3 className={style.feature_h3}>Vehicle details</h3>
        <div className={style.feature_vehdet_div}>
          {vehDet.map((detail, id) => (
            <div key={id} className={style.feature_vehdet}>
              <span>{detail.label}</span>
              <span>{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
