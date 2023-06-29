const Advert = require("../models/AdvertModel");
const Category = require("../models/CategoryModel");
const Vehicle = require("../models/category_models/VehicleModel");
const Residence = require("../models/category_models/ResidenceModel");
const Electronic = require("../models/category_models/ElectronicModel");
const Fashion = require("../models/category_models/FashionModel");
const HomeAndGarden = require("../models/category_models/HomeAndGardenModel");
const SecondHand = require("../models/category_models/SecondHandModel");
const SparePart = require("../models/category_models/SparePartModel");
const User = require("../models/UserModel");
const Item = require("../models/ItemModel");

const createImage = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
  }
};

const getImages = async (req, res) => {
  console.log("get items");
  try {
    const item = await Item.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({});

    console.log("başarı");
    res.json(adverts);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const getAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);

    res.json(advert);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const getUsersAdverts = async (req, res) => {
  try {
    const kullaniciId = req.params.kullaniciId;
    const ilanlar = await Advert.find({ userId: kullaniciId });

    res.json(ilanlar);
  } catch (err) {
    console.error(err);
    res.status(500).send("İlanlar alınırken bir hata oluştu.");
  }
};

const newVehicleAdvert = async (req, res) => {
  try {
    const v = await Vehicle.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};
const newResidenceAdvert = async (req, res) => {
  try {
    const v = await Residence.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};
const newElectronicAdvert = async (req, res) => {
  try {
    const v = await Electronic.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};
const newFashionAdvert = async (req, res) => {
  try {
    const v = await Fashion.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const newHomeAndGardenAdvert = async (req, res) => {
  try {
    const v = await HomeAndGarden.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};
const newSecondHandAdvert = async (req, res) => {
  try {
    const v = await SecondHand.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};
const newSparePartAdvert = async (req, res) => {
  try {
    const v = await SparePart.create(req.body);

    res.json(v);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const deleteAdvert = async (req, res) => {
  try {
    await Advert.findByIdAndDelete(req.params.id);
    console.log("ürün silindi");
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const updateAdvert = async (req, res) => {
  try {
    await Advert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("ürün güncellendi");
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const newCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    console.log("kategori başarıyla eklendi!");
    const cat = await Category.find({});

    res.end();
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = (req, res) => {
  const photoPath = req.body;
  const photoData = fs.readFileSync(photoPath);

  const newPhoto = new Image({
    name: "my photo",
    data: photoData,
  });

  // Fotoğrafı kaydedin
  newPhoto.save((err) => {
    if (err) {
      console.error(err);
      // Hata yönetimi yapabilirsiniz
    } else {
      console.log("Fotoğraf başarıyla kaydedildi.");
      // Başarılı kaydetme işlemini takip eden diğer işlemleri yapabilirsiniz
    }
  });
};

module.exports = {
  getAdvert,
  getAllAdverts,
  newCategory,
  newVehicleAdvert,
  newResidenceAdvert,
  newElectronicAdvert,
  newFashionAdvert,
  newSecondHandAdvert,
  newHomeAndGardenAdvert,
  newSparePartAdvert,
  deleteAdvert,
  updateAdvert,
  getUsersAdverts,
  createImage,
  getImages,
};
