const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Untitled Post",
      minlength: 3,
    },
    body: {
      type: String,
      required: true,
      minlength: 10,
    },
    photo: { type: String, required: true },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Post", PostSchema);
