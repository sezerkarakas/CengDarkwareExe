const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../CategoryModel");
const Advert = require("../AdvertModel");

const FashionSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  marka: { type: String, required: true },
  turu: { type: String, required: true },
  renk: { type: String, required: true },
  tarz: { type: String, required: true },
  malzeme: { type: String, required: true },
});

const Fashion = Advert.discriminator("Fashion", FashionSchema);

module.exports = Fashion;
