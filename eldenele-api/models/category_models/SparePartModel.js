const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../CategoryModel");
const Advert = require("../AdvertModel");

const SparePartSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  parcaAdi: { type: String, required: true },
  parcaNumarasi: { type: String, required: true },
  durumu: { type: String, required: true },
});

const SparePart = Advert.discriminator("SparePart", SparePartSchema);
module.exports = SparePart;
