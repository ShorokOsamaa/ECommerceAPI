require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/custom-error");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) throw new UnauthenticatedError("No token provided");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      throw new UnauthenticatedError("Not authorized to access this route");

    // console.log(user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
