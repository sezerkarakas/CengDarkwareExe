const router = require("express").Router();
const {
    getAllAdverts,
    getAdvert,
    getUsersAdverts,
    newAdvert,
    updateAdvert,
    deleteAdvert,
    uploadImage,
    getImage
  } = require("../controllers/AdvertController");

  router.get('/', getAllAdverts);
  router.get('/:id', getAdvert);
  router.get('/user/:kullaniciId', getUsersAdverts);
  router.post('/', newAdvert);
  router.put('/:id', updateAdvert);
  router.delete('/:id', deleteAdvert);
  router.post('/upload', uploadImage);
  router.get('/image/:id', getImage);