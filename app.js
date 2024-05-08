require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// MIDDLEWARE
app.use(express.json());

// ROUTES
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/api/v1/products", require("./routes/products"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/cart", require("./routes/cart"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// app.get("/products", (req, res) => {
//   res.send("This should be the products!");
// });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something Went Wrong!!",
  });
});

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running in port ${port}`));
