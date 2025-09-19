import express from "express";
import fs from "fs-extra";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/api", async (req, res) => {
  try {
    const data = await fs.readJson("products.json");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load products.json" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
