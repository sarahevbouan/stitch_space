const express = require("express");
const { isAuthWare } = require("../controllers/authController");
const {
  createRequest,
  getRequests,
} = require("../controllers/requestController");
const requestRoutes = express.Router();

// requestRoutes.use(isAuthWare);
requestRoutes.post("/", createRequest);
requestRoutes.get("/", getRequests);

module.exports = requestRoutes;
