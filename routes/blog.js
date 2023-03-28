const express = require("express");
const multer = require("multer");
const UploadError = require("../errors");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/blog");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/blogs");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `blog-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new UploadError("Only image files are allowed"), false);
  }
};

// Create a multer middleware instance with the filter configuration
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// const upload = multer({ dest: "public/img/blogs" });
const router = express.Router();

router.route("/").get(getPosts);

router.post("/", upload.single("photo"), createPost);

router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
