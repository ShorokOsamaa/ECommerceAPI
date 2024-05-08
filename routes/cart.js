const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const { getCart, addItem, deleteItem } = require("../controllers/cartItems");
const router = express.Router();

// @router GET && POST /api/v1/cart
router.route("/").get(authenticateToken, getCart);
router
  .route("/:id")
  .post(authenticateToken, addItem)
  .delete(authenticateToken, deleteItem);

module.exports = router;
