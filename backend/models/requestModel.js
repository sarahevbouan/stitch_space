const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  designerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  pieces: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      default: [],
      ref: "Piece",
    },
  ],
  message: {
    type: String,
    default: "I'll like us to talk more about this piece",
  },
  status: {
    type: String,
    enum: ["pending", "contacted", "completed"],
    default: "pending",
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});

const requestModel = mongoose.model("Request", requestSchema);

module.exports = requestModel;
