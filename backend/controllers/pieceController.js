const mongoose = require("mongoose");
const pieceModel = require("../models/pieceModel");

const storePiece = async (req, res) => {
  try {
    // const id = new mongoose.Types.ObjectId(req.body.designerId);
    const newPiece = new pieceModel(req.body);
    await newPiece.save();
    res.json({ message: "You have added a new piece to your collection" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getPieces = async (req, res) => {
  try {
    const { designerId } = req.params;
    //implement fetching all blogs regardless of designer later on
    const pieces = await pieceModel.find({ designerId: designerId });
    if (!pieces) {
      res.status(404).json({ message: "No piece under such designer" });
    }
    //all pieces returned with their information
    // so in frontend, when a user clicks on individual piece,
    // don't have to query db for a single pice detail to use, already have it
    res.json({ pieces: pieces, total: pieces.length, designerId: designerId });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  storePiece,
  getPieces,
};
