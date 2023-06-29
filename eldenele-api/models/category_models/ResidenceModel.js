const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../CategoryModel");
const Advert = require("../AdvertModel");

const ResidenceSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  odaSayisi: { type: String, required: true },
  binaYasi: { type: String, required: true },
  katSayisi: { type: String, required: true },
  isitma: { type: String, required: true },
  banyoSayisi: { type: Number, required: true },
  balkon: { type: String, required: true },
  esyali: { type: String, required: true },
  siteIcerisinde: { type: String, required: true },
  aidatBilgileri: { type: String, required: true },
});

const Residence = Advert.discriminator("Residence", ResidenceSchema);
module.exports = Residence;
