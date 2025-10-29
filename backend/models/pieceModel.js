// convention is to create separate model file for each collection

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pieceSchema = new Schema(
  {
    designer: {
      // this is the designerID
      //find a way to link to userid
      //designerId is the field required from frontend input field
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pieceName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageCarousel: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const pieceModel = new mongoose.model("Piece", pieceSchema);
module.exports = pieceModel;
