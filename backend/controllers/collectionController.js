const collectionModel = require("../models/collectionModel");

const createCollection = async (req, res) => {
  try {
    // we need all fields specified in the model from the frontend
    const { name, customerId } = req.body;
    const collection = await collectionModel.findOne({
      name: name,
      customerId: customerId,
    });
    if (collection) {
      return res.status(401).json({
        message: "You already have a collection with that name",
      });
    }
    const newCollection = new collectionModel(req.body);
    const addedCollection = await newCollection.save();
    res.json({ addedCollection, message: "Collection successfully created" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const addPiece = async (req, res) => {
  try {
    // we need customerId, collectionId and array of pieceId (newPiece) from frontend
    //piece and collection will be selected in the frontend via buttons
    const { customerId, collectionId, newPiece } = req.body;
    const collection = await collectionModel.findOne({
      customerId: customerId,
      _id: collectionId,
    });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    await collectionModel.findOneAndUpdate(
      {
        customerId: customerId,
        _id: collectionId,
      },
      { $addToSet: { pieces: { $each: newPiece } } }
    );
    res.json({ message: "Your piece has been succesfully added." });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getCollections = async (req, res) => {
  try {
    const { customerId } = req.params;
    console.log(customerId);
    const collection = await collectionModel
      .find({
        customerId: customerId,
      })
      .populate("pieces");
    if (!collection) {
      return res.status(401).json({ message: "Collection could not be found" });
    }
    res.json({ collections: collection, total: collection.length });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  createCollection,
  addPiece,
  getCollections,
};
