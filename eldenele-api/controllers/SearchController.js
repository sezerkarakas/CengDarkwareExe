const FavoriteSearches = require("../models/FavoriteSearchesModel");
const User = require("../models/UserModel");

const newFavoriteSearch = async (req, res) => {
  try {
    await FavoriteSearches.create(req.body);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const removeFavoriteSearch = async (req, res) => {
  const searchId = req.params._id;
  try {
    await FavoriteSearches.findByIdAndDelete(searchId).then(() => {
      res.status(200).json({ message: "Arama silindi!" });
    });
    console.log("Arama silindi");
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const getAllFavoriteSearches = async (req, res) => {
  try {
    const searches = await User.findById(req.params.userId).populate(
      "favoritesearches"
    );
    console.log(searches);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newFavoriteSearch,
  removeFavoriteSearch,
  getAllFavoriteSearches,
};
