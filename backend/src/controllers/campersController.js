import axios from "axios";

const API_URL = process.env.API_URL;

export const getCampers = async (req, res) => {
  const { offset = 0, limit = 4, filters = {} } = req.body;

  try {
    const response = await axios.get(API_URL);
    let items = response.data.items;

    const filteredItems = items.filter((item) => {
      for (const key in filters) {
        const filterValue = filters[key];
        if (!filterValue) continue;

        if (key === "location") {
          if (
            !item.location.toLowerCase().includes(filterValue.toLowerCase())
          ) {
            return false;
          }
        }

        if (key === "equipment" && Array.isArray(filterValue)) {
          if (!filterValue.every((f) => item[f] === true)) {
            return false;
          }
        }

        if ((key === "form" || key === "transmission") && filterValue) {
          if (item[key].toLowerCase() !== filterValue.toLowerCase()) {
            return false;
          }
        }
      }
      return true;
    });

    const pagedItems = filteredItems.slice(offset, offset + limit);

    res.json({
      total: filteredItems.length,
      items: pagedItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Campers alınamadı" });
  }
};

export const getCamperById = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Ürün bulunamadı" });
  }
};
