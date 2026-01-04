# TRAVELTRUCKS

**TravelTrucks** is a campervan rental platform built with **React, Redux Toolkit, and Express**. Users can browse campers, filter by features, mark favorites, view detailed information, read reviews, and submit reservations.

---

## PAGES & FEATURES

### HOME PAGE (`/`)
- Implemented in `pages/Home/Home.jsx`  
- Displays a hero section with background image, main title, subtitle, and a **“View Now”** button that navigates to the catalog.  
- Shows the main branding and welcome message.

### CATALOG PAGE (`/catalog`)
- Implemented in `pages/Catalog/Catalog.jsx`  
- **Left column:** Filters panel (`components/Filters/Filters.jsx`) to filter campers by:
  - Location  
  - Vehicle type  
  - Equipment  
- **Right column:** Camper list (`components/CampersList/CampersList.jsx`) displaying:  
  - Camper image, name, price, rating, location  
  - Short description  
  - Features icons  
  - Favorite toggle button  
  - Show More link to open detail page  
- Supports pagination with **Load More** button.  
- Shows **Loader** (`components/Loader/Loader.jsx`) while fetching data.

### CAMPER DETAIL PAGE (`/catalog/:id`)
- Implemented in `pages/Detail/Detail.jsx`  
- Displays full camper information including gallery, description, and key features.  
- Includes **Form** component (`components/Form/Form.jsx`) to submit reservations directly on the page.  
- Uses nested routes to show tabs:  
  - **Features** (`components/Features/Features.jsx`) → default view, shows camper features and vehicle details  
  - **Reviews** (`components/Reviews/Reviews.jsx`) → displays camper reviews with reviewer name, avatar, rating, and comment

---

## COMPONENTS

- **Header** (`components/Header/Header.jsx`): Navigation links to Home and Catalog pages with active state highlighting  
- **CampersList / CamperCard** (`components/CampersList/` & `components/CamperCard/`): Individual camper cards with image, price, rating, location, features, favorite button, and Show More link  
- **Filters & FilterButton** (`components/Filters/Filters.jsx` & `components/FilterButton/FilterButton.jsx`): Panel and button for filtering campers and executing search  
- **Features** (`components/Features/Features.jsx`): Shows camper features and vehicle specifications on the detail page  
- **Form** (`components/Form/Form.jsx`): Reservation form with name, email, date, and comment, integrated with backend email service  
- **Reviews** (`components/Reviews/Reviews.jsx`): Lists camper reviews with reviewer info and rating  
- **Loader** (`components/Loader/Loader.jsx`): Full-screen loading spinner overlay

---

## TECHNOLOGIES

- **Frontend:** React 18 (Vite), Redux Toolkit, React Router v6, Axios, CSS Modules  
- **Backend:** Node.js, Express  
- **Email Service:** Brevo (Sendinblue)  
- **Other Libraries:** React-Toastify, React-DatePicker, React-Spinners  

---

## PROJECT STRUCTURE

frontend/
├─ src/
│  ├─ api/
│  │  └─ axios.js
│  ├─ components/
│  │  ├─ CampersList/
│  │  │  ├─ CampersList.jsx
│  │  │  └─ CampersList.module.css
│  │  ├─ Features/
│  │  │  ├─ Features.jsx
│  │  │  └─ Features.module.css
│  │  ├─ FilterButton/
│  │  │  ├─ FilterButton.jsx
│  │  │  └─ FilterButton.module.css
│  │  ├─ Filters/
│  │  │  ├─ Filters.jsx
│  │  │  └─ Filters.module.css
│  │  ├─ Form/
│  │  │  ├─ Form.jsx
│  │  │  └─ Form.module.css
│  │  ├─ Header/
│  │  │  ├─ Header.jsx
│  │  │  └─ Header.module.css
│  │  ├─ Loader/
│  │  │  ├─ Loader.jsx
│  │  │  └─ Loader.module.css
│  │  ├─ Reviews/
│  │    ├─ Reviews.jsx
│  │    └─ Reviews.module.css   
│  ├─ constants/
│  │  ├─ featuresConfig.js
│  │  └─ icons.js
│  ├─ pages/
│  │  ├─ Home/
│  │  │  ├─ Home.jsx
│  │  │  └─ Home.module.css
│  │  ├─ Catalog/
│  │  │  ├─ Catalog.jsx
│  │  │  └─ Catalog.module.css
│  │  └─ Detail/
│  │     ├─ Detail.jsx
│  │     └─ Detail.module.css
│  └─ redux/
│     ├─ campersSlice.js
│     ├─ favorites/
│     │  ├─ favoritesSlice.js
│     │  └─ favoritesSelectors.js
│     └─ store.js

backend/
├─ src/
│  ├─ controllers/
│  │  ├─ campersController.js
│  │  └─ reservationController.js
│  ├─ routes/
│  │  ├─ campersRoutes.js
│  │  └─ reservationRoutes.js
│  └─ services/
│     └─ mailService.js
