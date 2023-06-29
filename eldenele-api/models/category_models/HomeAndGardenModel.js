const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../CategoryModel");
const Advert = require("../AdvertModel");

const HomeAndGardenSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  malzeme: { type: String, required: true },
  turu: { type: String, required: true },
  marka: { type: String, required: true },
  renk: { type: String, required: true },
  durumu: { type: String, required: true },
  garanti: { type: String, required: true },
});

const HomeAndGarden = Advert.discriminator(
  "HomeAndGarden",
  HomeAndGardenSchema
);
module.exports = HomeAndGarden;
