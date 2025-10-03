const express = require("express");
const { storePiece, getPieces } = require("../controllers/pieceController");
const { isAuthWare } = require("../controllers/authController");
const pieceRoute = express.Router();

pieceRoute.get("/:designerId", getPieces);
pieceRoute.use(isAuthWare);
pieceRoute.post("/", storePiece);

module.exports = pieceRoute;
