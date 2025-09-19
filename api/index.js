import express from "express";
import fs from "fs-extra";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api", async (req, res) => {
  try {
    const rawData = await fs.readJson("products.json");

    const productsOnly = rawData.filter(
      (p) => p.id && p.id.startsWith("gid://shopify/Product/")
    );

    const filteredProducts = productsOnly.filter((p) =>
      ["ACTIVE", "DRAFT"].includes((p.status || "").toUpperCase())
    );

    res.json({
      total: filteredProducts.length,
      products: filteredProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load products.json" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
