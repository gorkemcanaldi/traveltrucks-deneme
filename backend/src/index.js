import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/campers", async (req, res) => {
  const { offset = 0, limit = 4, filters = {} } = req.body;

  const response = await axios.get(
    "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
  );

  // response.data = { total, items }
  let items = response.data.items;

  const filteredItems = items.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key];
      if (filterValue === undefined || filterValue === null) continue;

      // location string search
      if (key === "location") {
        if (!item.location.toLowerCase().includes(filterValue.toLowerCase())) {
          return false;
        }
        continue;
      }

      // boolean features array
      if (key === "equipment" && Array.isArray(filterValue)) {
        if (!filterValue.every((feat) => item[feat] === true)) {
          return false;
        }
        continue;
      }

      // type / transmission (string value)
      if ((key === "form" || key === "transmission") && filterValue) {
        if (item[key].toLowerCase() !== filterValue.toLowerCase()) return false;
      }
    }
    return true;
  });

  const pagedItems = filteredItems.slice(offset, offset + limit);

  res.json({
    total: filteredItems.length,
    items: pagedItems,
  });
});

app.listen(3000, () => {
  console.log("backend kontrol");
});
