require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const CartItem = require("../models/CartItem");
const { NotFoundError } = require("../errors/custom-error");

exports.getCart = async (req, res, next) => {
  const { id, name, email } = req.user;
  const [result, _] = await CartItem.getCart(id);

  res.status(StatusCodes.OK).json(result);
};

exports.addItem = async (req, res, next) => {
  const { id, name, email } = req.user;
  const { quantity } = req.body;
  const productId = req.params.id;

  const [itemExist, _] = await CartItem.itemExist(id, productId);

  const q = itemExist[0] ? itemExist[0].quantity : 0;
  const exist = itemExist[0] ? true : false;

  const cartItemInstance = new CartItem(id, productId, quantity + q, exist);

  const cartitem = await cartItemInstance.save();

  // console.log(cartitem);
  res.status(StatusCodes.CREATED).json({
    message: "Item added",
    id: cartitem[0].insertId,
  });
};

exports.deleteItem = async (req, res, next) => {
  const { id, name, email } = req.user;
  const { quantity } = req.body;
  const productId = req.params.id;

  const [itemExist, _] = await CartItem.itemExist(id, productId);
  // console.log(itemExist[0]);

  if (!itemExist[0]) {
    throw NotFoundError("Item does not exist");
  }

  const result = await CartItem.deleteItem(
    id,
    productId,
    quantity,
    itemExist[0].quantity
  );

  const [cart, ___] = await CartItem.getCart(id);

  // console.log(cartitem);
  // console.log(id);
  // console.log(result);
  res.status(200).json({
    message: "Item deleted",
    cart: cart,
  });
};
