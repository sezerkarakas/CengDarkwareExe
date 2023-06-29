const express = require('express');
const axios = require('axios');
const fs = require('fs');
const { GridFSBucket } = require('mongodb');
const Advert = require('../models/AdvertModel');
const Vehicle = require("../models/category_Models/VehicleModel");
const Residence = require("../models/category_Models/ResidenceModel");
const Electronic = require("../models/category_Models/ElectronicModel");
const Fashion = require("../models/category_Models/FashionModel");
const HomeAndGarden = require("../models/category_Models/HomeAndGardenModel");
const SecondHand = require("../models/category_Models/SecondHandModel");
const SparePart = require("../models/category_Models/SparePartModel");
const Image = require("../models/ImageModel");

// Tüm ilanları getirme
const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({});
    res.json(adverts);
  } catch (error) {
    console.log(error);
    res.status(500).send('İlanlar alınırken bir hata oluştu.');
  }
};

// Belirli bir ilanı getirme
const getAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    res.json(advert);
  } catch (error) {
    console.log(error);
    res.status(500).send('İlan alınırken bir hata oluştu.');
  }
};

// Kullanıcının ilanlarını getirme
const getUsersAdverts = async (req, res) => {
  try {
    const kullaniciId = req.params.kullaniciId;
    const ilanlar = await Advert.find({ userId: kullaniciId });
    res.json(ilanlar);
  } catch (err) {
    console.error(err);
    res.status(500).send('İlanlar alınırken bir hata oluştu.');
  }
};

// Yeni ilan ekleme
const newAdvert = async (req, res) => {
  try {
    const { category, ...advertFields } = req.body;

    // Kategoriye göre ilgili modeli seçme
    let categoryModel;
    switch (category) {
      case 'vehicle':
        categoryModel = Vehicle;
        break;
      case 'residence':
        categoryModel = Residence;
        break;
      case 'electronic':
        categoryModel = Electronic;
        break;
      case 'fashion':
        categoryModel = Fashion;
        break;
      case 'homeandgarden':
        categoryModel = HomeAndGarden;
        break;
      case 'secondhand':
        categoryModel = SecondHand;
        break;
      case 'sparepart':
        categoryModel = SparePart;
        break;
      default:
        return res.status(400).json({ error: 'Geçersiz kategori' });
    }

    // İlanı kaydetme
    const newAdvert = new Advert(advertFields);
    const savedAdvert = await newAdvert.save();

    // İlgili kategori modeline ilanı bağlama
    const categoryFields = {
      advertId: savedAdvert._id,
      ...advertFields,
    };
    const newCategoryItem = new categoryModel(categoryFields);
    await newCategoryItem.save();

    res.json(savedAdvert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};

// İlan güncelleme
const updateAdvert = async (req, res) => {
  try {
    const { category, ...advertFields } = req.body;
    const { advertId } = req.params;

    // Kategoriye göre ilgili modeli seçme
    let categoryModel;
    switch (category) {
      case 'vehicle':
        categoryModel = Vehicle;
        break;
      case 'residence':
        categoryModel = Residence;
        break;
      case 'electronic':
        categoryModel = Electronic;
        break;
      case 'fashion':
        categoryModel = Fashion;
        break;
      case 'homeandgarden':
        categoryModel = HomeAndGarden;
        break;
      case 'secondhand':
        categoryModel = SecondHand;
        break;
      case 'sparepart':
        categoryModel = SparePart;
        break;
      default:
        return res.status(400).json({ error: 'Geçersiz kategori' });
    }

    // İlanı güncelleme
    const updatedAdvert = await Advert.findByIdAndUpdate(
      advertId,
      advertFields,
      { new: true }
    );

    // İlgili kategori modelini güncelleme
    const categoryFields = {
      advertId: updatedAdvert._id,
      ...advertFields,
    };
    await categoryModel.findOneAndUpdate({ advertId }, categoryFields);

    res.json(updatedAdvert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};

// İlan silme
const deleteAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;

    // İlanı silme
    await Advert.findByIdAndDelete(advertId);

    // İlgili kategori modelini silme
    await Vehicle.findOneAndDelete({ advertId });
    await Residence.findOneAndDelete({ advertId });
    await Electronic.findOneAndDelete({ advertId });
    await Fashion.findOneAndDelete({ advertId });
    await HomeAndGarden.findOneAndDelete({ advertId });
    await SecondHand.findOneAndDelete({ advertId });
    await SparePart.findOneAndDelete({ advertId });

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};

// GridFSBucket oluşturma
const conn = mongoose.connection;
const bucket = new GridFSBucket(conn.db);

// Image yükleme
const uploadImage = async (req, res) => {
  try {
    const { originalname, mimetype, path } = req.file;

    // Image dosyasını GridFSBucket'a yükleme
    const uploadStream = bucket.openUploadStream(originalname);
    fs.createReadStream(path).pipe(uploadStream);

    uploadStream.on('error', (error) => {
      console.log('Image yükleme hatası:', error);
      res.status(500).json({ error: 'Image yüklenirken bir hata oluştu' });
    });

    uploadStream.on('finish', async () => {
      // Image kaydetme
      const image = new Image({
        filename: originalname,
        contentType: mimetype,
        fileId: uploadStream.id, // GridFSBucket'da oluşturulan file ID'si
      });

      await image.save();

      res.status(200).json({ success: true, message: 'Image başarıyla yüklendi' });
    });
  } catch (error) {
    console.log('Image yükleme hatası:', error);
    res.status(500).json({ error: 'Image yüklenirken bir hata oluştu' });
  }
};

// Image çekme
const getImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    // Image verisini GridFSBucket'tan çekme
    const imageStream = bucket.openDownloadStreamByName(imageId);

    imageStream.on('error', (error) => {
      console.log('Image çekme hatası:', error);
      res.status(404).json({ error: 'Image bulunamadı' });
    });

    imageStream.on('file', (file) => {
      // Content-Type header'ını ayarlama
      res.set('Content-Type', file.contentType);
    });

    imageStream.pipe(res);
  } catch (error) {
    console.log('Image çekme hatası:', error);
    res.status(500).json({ error: 'Image çekilirken bir hata oluştu' });
  }
};

module.exports = {
  getAllAdverts,
  getImage,
  uploadImage,
  deleteAdvert,
  updateAdvert,
  newAdvert,
  getUsersAdverts,
  getAdvert
};
