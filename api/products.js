import fs from "fs-extra";

export default async function handler(req, res) {
  try {
    const rawData = await fs.readJson("products.json"); // Or fetch dynamically
    const productsOnly = rawData.filter(p => p.id && p.id.startsWith("gid://shopify/Product/"));

    // Optional: pagination
    const { page = 1, limit = 100 } = req.query;
    const start = (page - 1) * limit;
    const paginated = productsOnly.slice(start, start + Number(limit));

    res.status(200).json({
      total: productsOnly.length,
      page: Number(page),
      products: paginated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
