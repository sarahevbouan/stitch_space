const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const authRoute = require("./routes/authRoute");
const pieceRoute = require("./routes/pieceRoute");
const collectionRoutes = require("./routes/collectionRoutes");
const requestRoutes = require("./routes/requestRoutes");
require("dotenv").config();
const entry_route = path.join(__dirname, "../frontend/dist");

// console.log(process.env);
const port = process.env.PORT || 6000;
const DB_uri = process.env.DB_URI;
mongoose.connect(DB_uri).then(() => console.log("Connected to DB"));

app.use(express.static(entry_route));
app.use(
  session({
    secret: "my_Secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/pieces", pieceRoute);
app.use("/api/collections", collectionRoutes);
app.use("/api/requests", requestRoutes);
app.use((req, res) => {
  res.sendFile(path.join(entry_route, "/index.html"));
});

app.listen(port, () => console.log(`listening at port ${port}`));
