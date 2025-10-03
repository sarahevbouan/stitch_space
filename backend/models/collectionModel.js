const mongoose = require("mongoose");
const userModel = require("./userModel");
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pieces: [{ type: Schema.Types.ObjectId, default: [], ref: "Piece" }],
  },
  { timestamps: true }
);

const collectionModel = new mongoose.model("Collection", collectionSchema);

module.exports = collectionModel;
