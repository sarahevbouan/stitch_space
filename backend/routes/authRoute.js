const express = require("express");
const authRoute = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

//These don't work without the first forward slash
authRoute.post("/signup", registerUser);
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);

module.exports = authRoute;
