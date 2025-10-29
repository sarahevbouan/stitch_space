const mongoose = require("mongoose");
const pieceModel = require("../models/pieceModel");
const path = require("path");
const uuidv4 = require("uuid").v4;
const cloudinaryUploader = require("../services/apiCloudinary");

const storePiece = async (req, res) => {
  console.log(req.files["imageUrl"], req.files["imageCarousel"], req.body);
  try {
    const coverPhoto = req.files["imageUrl"][0];
    const designPhotos = req.files["imageCarousel"];
    const imageArray = await cloudinaryUploader(coverPhoto, designPhotos);
    const imageUrl = imageArray[0];
    const imageCarousel = imageArray
      .slice(-4)
      .map((url) => ({ id: uuidv4(), url }));

    const newPiece = new pieceModel({ ...req.body, imageUrl, imageCarousel });
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
    const pieces = designerId
      ? await pieceModel
          .find({ designer: designerId })
          .populate("designer", "name")
      : await pieceModel.find({}).populate("designer", "name");
    if (!pieces.length) {
      res.status(404).json({ message: "No piece was found" });
    }
    //all pieces returned with their information
    // so in frontend, when a user clicks on individual piece,
    // don't have to query db for a single piece detail to use, already have it
    res.json({
      pieces: pieces,
      total: pieces.length,
      designerName: designerId
        ? pieces[0]?.designer.name || pieces?.designer.name
        : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  storePiece,
  getPieces,
  // multerUpload,
};
