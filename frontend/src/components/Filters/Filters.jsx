import React, { useState } from "react";
import style from "./Filters.module.css";
import { icons } from "../../constants/icons";
import FilterButton from "../FilterButton/FilterButton";
import { filterOptions } from "../../constants/featuresConfig";

function Filters({ onSearch }) {
  const [location, setLocation] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);

  const typeOptions = [
    { key: "panelTruck", label: "Van", icon: icons.van },
    {
      key: "fullyIntegrated",
      label: "Fully Integrated",
      icon: icons.fullyIntegrated,
    },
    { key: "alcove", label: "Alcove", icon: icons.alcove },
  ];

  const toggleFeature = (key) => {
    if (key === "transmission") {
      toggleTransmission("automatic");
    } else {
      setSelectedFeatures((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  };
  const toggleTransmission = (value) => {
    setSelectedTransmission((prev) => (prev === value ? null : value));
  };

  const toggleType = (key) => {
    setSelectedType((prev) => (prev === key ? null : key));
  };

  const handleSearch = () => {
    const filters = {
      location: location || undefined,
      equipment: selectedFeatures.length ? selectedFeatures : undefined,
      form: selectedType || undefined,
      transmission: selectedTransmission || undefined,
    };
    onSearch(filters);
  };

  return (
    <div>
      <p>Location</p>
      <label className={style.loc_label}>
        <input
          className={style.loc_input}
          type="text"
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <img className={style.map} src="icons/map.svg" alt="mapIcon" />
      </label>

      <div className={style.filter_head}>
        <span>Filters</span>
        <h3>Vehicle equipment</h3>
      </div>

      <div className={style.eq_div}>
        {filterOptions.map((f) => (
          <div
            key={f.key}
            className={`${style.filter_item} ${
              selectedFeatures.includes(f.key) ||
              (selectedTransmission === "automatic" && f.key === "transmission")
                ? style.active
                : ""
            }`}
            onClick={() => toggleFeature(f.key)}
          >
            <img src={f.icon} height={32} width={32} alt={f.label} />
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      <h3 className={style.type_h3}>Vehicle type</h3>
      <div className={style.eq_div}>
        {typeOptions.map((t) => (
          <div
            key={t.key}
            className={`${style.filter_item} ${
              selectedType === t.key ? style.active : ""
            }`}
            onClick={() => toggleType(t.key)}
          >
            <img src={t.icon} />
            <span className={style.filter_span}>{t.label}</span>
          </div>
        ))}
      </div>

      <FilterButton onSearch={handleSearch} />
    </div>
  );
}

export default Filters;
