const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./UserModel");

const itemSchema = mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

const AdvertSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  categoryName: { type: String, ref: "Category", required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  dateCreated: { type: String, default: () => new Date().toLocaleDateString() },
  image: { type: Schema.Types.ObjectId, ref: "Item" },
});

const Advert = mongoose.model("Advert", AdvertSchema);

module.exports = { Advert, Item };
