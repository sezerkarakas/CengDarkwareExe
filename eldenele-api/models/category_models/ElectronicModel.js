const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../CategoryModel");
const Advert = require("../AdvertModel");

const ElectronicSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  turu: { type: String, required: true },
  renk: { type: String, required: true },
  garanti: { type: String, required: true },
});

const Electronic = Advert.discriminator("Electronic", ElectronicSchema);

module.exports = Electronic;
