const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  getAllProducts,
  addNewProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");
const router = express.Router();

// @router GET && POST /api/v1/products
router.route("/").get(getAllProducts).post(authenticateToken, addNewProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(authenticateToken, updateProduct)
  .delete(authenticateToken, deleteProduct);

module.exports = router;
