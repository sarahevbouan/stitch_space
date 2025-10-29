const bcrypt = require("bcrypt");
// const multer = require("multer");
const userModel = require("../models/userModel");
// upload

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    const user = await userModel.findOne({ email });
    if (user) {
      //return a message to frontend
      return res.status(401).json({ message: "User already exists" });
    }
    //frontend sends a user object with properties indicated in the usermodel
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.json({
      message: "Your account has been successfully created, Login to continue!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    //required frontend fields are email, password
    console.log(req.body);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(401).json({
        message: "Incorrect username or password",
        isAuthenticated: false,
      });
    } else {
      req.session.isAuthenticated = true;
      res.json({
        message: "Login successful",
        isAuthenticated: true,
        //convention is to send only necessary data to frontend
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
          location: user.location,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Inrernal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out", isAuthenticated: false });
  } catch (error) {
    res.status(400).json({ message: "Action failed" });
  }
};

const isAuthWare = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  }
  res.status(401).json({ message: "Unauthorised" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  isAuthWare,
};
