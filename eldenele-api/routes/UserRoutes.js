const {
  addToLikedAds,
  getLikedAds,
  removeAdFromLikedAds,
  addUser,
  checkEmail,
  checkName,
  login,
  changePassword,
  checkPassword,
  getUser,
} = require("../controllers/UserController");
const advertController = require("../controllers/AdvertController");

const router = require("express").Router();

router.post("/add", addToLikedAds);
router.get("/liked/:email", getLikedAds);
router.delete("/remove", removeAdFromLikedAds);
router.post("/addUser", addUser);
router.get("/checkEmail/:email", checkEmail);
router.post("/checkName", checkName);
router.post("/login", login);
router.put("/changepassword/:email", changePassword);
router.post("/checkPassword", checkPassword);
router.get("/getUser/:id", getUser);
//ilanları listeleme
router.get("/getAll", advertController.getAllAdverts);
//tek ilan getirme
router.get("/get/:id", advertController.getAdvert);
//yeni ilan yükleme
router.post("/newadd", advertController.newAdvert);
//ilan silme
router.delete("/delete/:id", advertController.deleteAdvert);
//ilan güncelleme(güncellenmedi henüz)
router.put("/update/:id", advertController.updateAdvert);
//kullanıcının ilanlarını getirme
router.get("/ilanlar/:id", advertController.getUsersAdverts);
//bütün resimleri çekme
router.get("/image", advertController.getImages);
//bir tane resim çekme
router.get("/image/:id", advertController.getImage);
//kategoriye göre ilan listeleme
router.get("/:categoryName", advertController.getByCategory);
//resim yükleme
router.post("/image", advertController.createImage);
module.exports = router;
