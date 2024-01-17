const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("index", {
      products: products,
    });
  } catch (error) {
    console.error("Error obtaining products", error);
    res.status(500).json({
      error: "Internal server error ",
    });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.status(500).json({
      error: "Internal server error ",
    });
  }
});

module.exports = router;
