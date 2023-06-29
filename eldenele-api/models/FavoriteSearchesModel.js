const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./UserModel");

const FavoriteSearchesSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  searchName: { type: String },
});

const FavoriteSearches = mongoose.model(
  "FavoiteSearches",
  FavoriteSearchesSchema
);
module.exports = FavoriteSearches;
