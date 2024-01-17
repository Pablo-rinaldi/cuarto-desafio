const express = require("express");

const router = express.Router();

const CartManager = require("../controllers/cart-manager.js");

const manager = new CartManager("./src/models/carts.json");

router.post("/carts", async (req, res) => {
  try {
    await manager.createCart();
    res.send("carrito creado");
  } catch (error) {
    console.error("Error al crear carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/carts/:cid", async (req, res) => {
  let cartId = parseInt(req.params.cid);

  try {
    const selectedCart = await manager.getCartById(cartId);

    if (selectedCart) {
      res.send(selectedCart);
    } else {
      res.send("Carrito no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let prodId = parseInt(req.params.pid);

  try {
    const updatedCart = await manager.addProducts(cartId, prodId);
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error al agregar al carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
