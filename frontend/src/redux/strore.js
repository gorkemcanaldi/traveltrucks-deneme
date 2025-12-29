import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campersSlice.js";
import favoritesReducer from "./favorites/favoritesSlice.js";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
  },
});

export default store;
