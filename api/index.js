import fs from "fs-extra";

export default async function handler(req, res) {
  try {
    const rawData = await fs.readJson("products.json");

    // सिर्फ product वाले ids
    const productsOnly = rawData.filter(
      (p) => p.id && p.id.startsWith("gid://shopify/Product/")
    );

    // सिर्फ ACTIVE और DRAFT वाले
    const filteredProducts = productsOnly.filter((p) =>
      ["ACTIVE", "DRAFT"].includes((p.status || "").toUpperCase())
    );

    res.status(200).json({
      total: filteredProducts.length,
      products: filteredProducts,
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to load products.json" });
  }
}
