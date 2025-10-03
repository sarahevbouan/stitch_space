const express = require("express");
const {
  createCollection,
  addPiece,
  getCollections,
} = require("../controllers/collectionController");
const { isAuthWare } = require("../controllers/authController");
const collectionRoutes = express.Router();

collectionRoutes.use(isAuthWare);
collectionRoutes.post("/", createCollection);
collectionRoutes.post("/add", addPiece);
collectionRoutes.get("/:customerId", getCollections);

module.exports = collectionRoutes;
