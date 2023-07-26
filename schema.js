const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    image: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
  },
  { timesstamps: true }
);
// Schema above  ☝☝☝☝☝☝

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
