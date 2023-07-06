const { Advert, Item } = require("../models/AdvertModel");
const Category = require("../models/CategoryModel");
const Vehicle = require("../models/category_models/VehicleModel");
const Residence = require("../models/category_models/ResidenceModel");
const Electronic = require("../models/category_models/ElectronicModel");
const Fashion = require("../models/category_models/FashionModel");
const HomeAndGarden = require("../models/category_models/HomeAndGardenModel");
const SecondHand = require("../models/category_models/SecondHandModel");
const SparePart = require("../models/category_models/SparePartModel");

const createImage = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {}
};

//tüm resimleri çeker
const getImages = async (req, res) => {
  try {
    const item = await Item.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//bir tane resim çeker
const getImage = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// bütün ilanları çeker
const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find().populate("image").exec();
    res.json(adverts);
  } catch (error) {
    console.error("Veri alınırken bir hata oluştu:", error);
    res.status(500).json({ error: "Veri alınırken bir hata oluştu" });
  }
};

// bir tane ilan çeker
const getAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);

    res.json(advert);
  } catch (error) {
    console.log(error);
  }
};

const getByCategory = async (req, res) => {
  const { categoryName } = req.params;
  try {
    const adverts = await Advert.find({ categoryName: categoryName });
    res.json(adverts);
  } catch (error) {
    console.log(error);
  }
};

// kullanıcının ilanlarını çeker
const getUsersAdverts = async (req, res) => {
  try {
    const userId = req.params.id;
    const ilanlar = await Advert.find({ userId });

    res.json(ilanlar);
  } catch (err) {
    console.error(err);
    res.status(500).send("İlanlar alınırken bir hata oluştu.");
  }
};

const getUsersAdvertsByCategory = async (req, res) => {
  try {
    const { categoryName, id } = req.params;
    const adverts = await Advert.find({ categoryName, id });
    res.json(adverts);
  } catch (error) {
    console.error("İlanlar alınamadı:", error);
    res.status(500).json({ error: "İlanlar alınamadı" });
  }
};

// yeni ilan yükleme kodu
const newAdvert = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    const { categoryName, ...advertFields } = req.body;

    // Kategoriye göre ilgili modeli seçme
    let categoryModel;
    switch (categoryName) {
      case "Vasita":
        categoryModel = Vehicle;
        break;
      case "Emlak":
        categoryModel = Residence;
        break;
      case "Elektronik":
        categoryModel = Electronic;
        break;
      case "Moda":
        categoryModel = Fashion;
        break;
      case "EvBahce":
        categoryModel = HomeAndGarden;
        break;
      case "İkinciEl" || "IkinciEl":
        categoryModel = SecondHand;
        break;
      case "YedekParca":
        categoryModel = SparePart;
        break;
      default:
        return res.status(400).json({ error: "Geçersiz kategori" });
    }

    // İlanı kaydetme
    const newCategoryItem = new categoryModel({ ...req.body, image: item._id });
    await newCategoryItem.save();

    res.json(newCategoryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};
//ilan silme
const deleteAdvert = async (req, res) => {
  try {
    await Advert.findByIdAndDelete(req.params.id);
    console.log("ürün silindi");
    res.end();
  } catch (error) {
    console.log(error);
  }
};

//ilan güncelleme(mükemmel ötesi güzeller güzeli dünyada dengi olmayan güzelim bitanem büşram yazdı)
const updateAdvert = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    const updatedItem = await Advert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const { categoryName, ...advertFields } = req.body;

    // Kategoriye göre ilgili modeli seçme
    let categoryModel;
    switch (categoryName) {
      case "Vasita":
        categoryModel = Vehicle;
        break;
      case "Emlak":
        categoryModel = Residence;
        break;
      case "Elektronik":
        categoryModel = Electronic;
        break;
      case "Moda":
        categoryModel = Fashion;
        break;
      case "EvBahce":
        categoryModel = HomeAndGarden;
        break;
      case "İkinciEl" || "IkinciEl":
        categoryModel = SecondHand;
        break;
      case "YedekParca":
        categoryModel = SparePart;
        break;
      default:
        return res.status(400).json({ error: "Geçersiz kategori" });
    }
    const updatedCategoryItem = await categoryModel.findByIdAndUpdate(
      updatedItem._id,
      advertFields,
      item._id,
      { new: true }
    );

    console.log("İlan güncellendi");
    res.json(updatedCategoryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

module.exports = {
  getAdvert,
  getAllAdverts,
  deleteAdvert,
  updateAdvert,
  getUsersAdverts,
  createImage,
  getImages,
  getImage,
  newAdvert,
  getByCategory,
  getUsersAdvertsByCategory
};
