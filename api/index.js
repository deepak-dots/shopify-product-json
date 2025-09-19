import express from "express";
import fs from "fs-extra";

const app = express();

// Main route
app.get("/", async (req, res) => {
  try {
    const rawData = await fs.readJson("products.json");

    // Only top-level products
    const productsOnly = rawData.filter(
      (p) => p.id && p.id.startsWith("gid://shopify/Product/")
    );

    // Active + Draft (same as Shopify Admin)
    const filteredProducts = productsOnly.filter((p) =>
      ["ACTIVE", "DRAFT"].includes((p.status || "").toUpperCase())
    );

    res.json({
      total: filteredProducts.length,
      products: filteredProducts,
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to load products.json" });
  }
});

// Export Express as default for Vercel
export default app;
