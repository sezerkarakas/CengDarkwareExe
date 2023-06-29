const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../CategoryModel");
const Advert = require("../AdvertModel");

const SecondHandSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  durumu: { type: String, required: true },
  takas: { type: String, required: true },
});

const SecondHand = Advert.discriminator("SecondHand", SecondHandSchema);

module.exports = SecondHand;
