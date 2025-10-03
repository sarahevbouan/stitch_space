const requestModel = require("../models/requestModel");

const createRequest = async (req, res) => {
  try {
    //take in all fields from model def
    // all fields compulsory
    const newRequest = new requestModel(req.body);
    await newRequest.save();
    res.json({
      message:
        "Your request has been sent. The designer will reach out to you soon",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getRequests = async (req, res) => {
  try {
    const { id, role } = req.query;
    let set_id = {};
    if (role === "designer") {
      set_id.designerId = id;
    } else if (role === "customer") {
      set_id.customerId = id;
    } else {
      res.status(500).json({ message: "Invalid role" });
    }
    const requests = await requestModel.find(set_id);
    if (!requests) {
      res.status(500).json({ message: "No request found" });
    }
    res.json({ requests: requests, total: requests.length });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  createRequest,
  getRequests,
};
