import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersSlice.js";
import CampersList from "../../components/CampersList/CampersList.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import style from "./Catalog.module.css";
import Loader from "../../components/Loader/Loader.jsx";

function Catalog() {
  const { items, loading, total } = useSelector((store) => store.campers);
  const [offset, setOffset] = useState(0);
  const [currentFilters, setCurrentFilters] = useState({});
  const limit = 4;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers({ offset: 0, limit, filters: {} }));
  }, [dispatch]);

  const handleFilter = (filters) => {
    setOffset(0);
    setCurrentFilters(filters);

    dispatch(fetchCampers({ offset: 0, limit, filters }));
  };

  const handlerLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);

    dispatch(
      fetchCampers({ offset: newOffset, limit, filters: currentFilters })
    );
  };

  return (
    <>
      <div className={style.card_flex}>
        <Filters onSearch={handleFilter} />
        {}
        <div>{loading && <Loader />}</div>
        <div>
          {!loading &&
            items.map((item) => {
              return <CampersList key={item.id} items={item} />;
            })}
        </div>
      </div>
      <div className={style.load_div}>
        {items.length < total && !loading && (
          <button className={style.load_buton} onClick={handlerLoadMore}>
            Load more
          </button>
        )}
      </div>
    </>
  );
}

export default Catalog;
