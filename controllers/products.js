const Product = require("../models/Product");
const { BadRequestError, NotFoundError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

exports.getAllProducts = async (req, res, next) => {
  const [products, _] = await Product.findAll();
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

exports.addNewProduct = async (req, res, next) => {
  const { name, category, price, imagePath, description } = req.body;

  const productInstance = new Product(
    name,
    category,
    price,
    imagePath,
    description
  );

  const product = await productInstance.save();
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Product added", productId: product[0].insertId });
};

exports.getProductById = async (req, res, next) => {
  const productId = req.params.id;
  const [product, _] = await Product.findProductById(productId);
  console.log(product);

  if (!product[0]) throw new BadRequestError("Product does not exist");

  res.status(StatusCodes.OK).json({ product: product[0] });
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const [response, _] = await Product.deleteProduct(productId);

  console.log(response);

  if (response.affectedRows === 0) {
    throw new NotFoundError("Item does not exist");
  }

  res.status(StatusCodes.OK).json({ messsage: "Product deleted" });
};

exports.updateProduct = async (req, res, next) => {
  const updatedData = req.body;
  const productId = req.params.id;
  const [product, ___] = await Product.findProductById(productId);
  // console.log(product[0]);
  if (product.length === 0) {
    throw new NotFoundError("Item does not exist");
  }

  const [response, __] = await Product.updateProduct(productId, {
    ...product[0],
    ...updatedData,
  });

  if (response.affectedRows === 0) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to update product" });
  }

  const [updatedProduct, _] = await Product.findProductById(productId);

  res
    .status(StatusCodes.OK)
    .json({ messsage: "Product updated", updatedProduct });
};
