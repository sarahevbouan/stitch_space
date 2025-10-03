const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["designer", "customer"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // tailor-specific
    bio: {
      type: String,
      required: function () {
        return this.role === "designer";
      },
    },
    location: {
      type: String,
      required: function () {
        return this.role === "designer";
      },
    },
    //remmeber to add this
    // customer-specific
    //   savedCollections: [ObjectId], // references Piece
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

//see if you can a collection field for designers and reference their pieces
