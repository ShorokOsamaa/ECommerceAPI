require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const [userSearch, _] = await User.findUserByEmail(email);
  if (userSearch[0]) {
    // console.log("---> Search result: " + userSearch[0].id);
    res.status(StatusCodes.CONFLICT).json({ message: "Email already exist!" });
  } else {
    const passwordHash = await bcrypt.hash(password, 10);

    const userInstance = new User(username, email, passwordHash);

    const user = await userInstance.save();

    res.status(StatusCodes.CREATED).json({
      message: "User created successfuly",
      userId: user[0].insertId,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const [userSearch, _] = await User.findUserByEmail(email);
  if (userSearch.length === 0) {
    // User does not exist
    console.log("---> User does not exist!");
    throw new NotFoundError("User does not exist!");
  } else {
    // User exist
    const hashedPassword = userSearch[0].password;
    if (await bcrypt.compare(password, hashedPassword)) {
      // Password Correct
      console.log("---> Login Successful");

      // Authenticate / Generate Web Token
      const accessToken = jwt.sign(
        { id: userSearch[0].id, name: userSearch[0].username, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      // Response
      res.status(StatusCodes.CREATED).json({
        message: `${userSearch[0].username} is logged in!`,
        accessToken: accessToken,
      });
    } else {
      // Password Incorrect
      console.log("---> Password Incorrect");
      throw new UnauthenticatedError("Password Incorrect");
    }
  }
};

exports.profile = async (req, res, next) => {
  const { email } = req.user;

  const [userSearch, _] = await User.findUserByEmail(email);

  if (userSearch.length === 0) {
    console.log("---> User does not exist!");
    throw new BadRequestError("User does not exist!");
  }

  const user = userSearch[0];
  delete user.password;

  res.status(StatusCodes.OK).json({ user: user });
};
