import express from "express";
import cors from "cors";
import router from "./routes/campersRoutes.js";
import reservation from "./routes/reservationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// tüm route'lar
app.use("/campers", router);
app.use("/reservation", reservation);

app.listen(3000, () => {
  console.log("Backend çalışıyor: http://localhost:3000");
});
