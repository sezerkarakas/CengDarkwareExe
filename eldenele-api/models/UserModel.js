const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  firstName: {
    type: String,
    required: true,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    max: 20,
  },
  kullanici_adi: {
    type: String,
    unique: true,
    required: true,
    max: 20,
  },
  phone: {
    type: String,
    required: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    max: 50,
  },
  likedAds: Array,
});

userSchema.methods.sifreAyarla = async function (password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  this.password = hashedPassword;
};

userSchema.methods.sifreDogrumu = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
