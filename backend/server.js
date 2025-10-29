require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const pieceRoute = require("./routes/pieceRoute");
const collectionRoutes = require("./routes/collectionRoutes");
const requestRoutes = require("./routes/requestRoutes");
const entry_route = path.join(__dirname, "../frontend/dist");

const port = process.env.PORT || 6000;
const DB_uri = process.env.DB_URI;

mongoose.connect(DB_uri).then(() => console.log("Connected to DB"));

//dev configs. change later to production config
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  session({
    secret: "my_Secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);
app.use(express.static(entry_route));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Headers:", req.headers["content-type"]);
  next();
});

app.use("/auth", authRoute);
app.use("/pieces", pieceRoute);
app.use("/collections", collectionRoutes);
app.use("/requests", requestRoutes);
app.use((req, res) => {
  res.sendFile(path.join(entry_route, "/index.html"));
});

app.listen(port, () => console.log(`listening at port ${port}`));
