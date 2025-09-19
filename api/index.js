import express from "express";
import fs from "fs-extra";

const app = express();

app.get("/", async (req, res) => {
  try {
    const rawData = await fs.readJson("products.json");
    const productsOnly = rawData.filter(
      p => p.id && p.id.startsWith("gid://shopify/Product/")
    );
    res.json({ total: productsOnly.length, products: productsOnly });
  } catch (err) {
    res.status(500).json({ error: "Failed to load products.json" });
  }
});

// Instead of app.listen, export as default for Vercel
export default app;
