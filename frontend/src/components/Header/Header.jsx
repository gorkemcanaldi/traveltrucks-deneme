import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { icons } from "../../constants/icons";
import style from "./Header.module.css";
export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.header}>
        <div className={style.header_logo} onClick={() => navigate("/")}>
          <img src={icons.logo} alt="TravelTrucksIconLogo" />
        </div>
        <nav className={style.nav_link}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.link_active}` : style.link
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.link_active}` : style.link
            }
            to="/catalog"
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </>
  );
}
