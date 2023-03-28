require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// routing
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// middlewares
const authMiddleware = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", blogRoutes);

app.use(errorHandler);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Speak for the app is listening");
    });
  } catch (err) {
    console.log(err);
  }
};
start();

module.exports = app;
