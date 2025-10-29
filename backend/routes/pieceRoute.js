const express = require("express");
const multer = require("multer");

const {
  storePiece,
  getPieces,
  // multerUpload,
} = require("../controllers/pieceController");
const { isAuthWare } = require("../controllers/authController");
const pieceRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerUpload = upload.fields([
  { name: "imageUrl", maxCount: 1 },
  { name: "imageCarousel", maxCount: 4 },
]);

pieceRoute.get("/", getPieces);
pieceRoute.get("/:designerId", getPieces);
// pieceRoute.use(isAuthWare);
pieceRoute.post("/", multerUpload, storePiece);

module.exports = pieceRoute;

// for get route "/:designerId", receive the designer id from the frontend, fetch all the piece and sort
//them by category.
// bottom line: an array of categories with category ID and name and a piece array containing the actual
// pieces
