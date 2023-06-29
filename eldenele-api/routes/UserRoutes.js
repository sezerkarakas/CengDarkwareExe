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
  getProfile,
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
router.get("/getAll", advertController.getAllAdverts);
router.get("/get/:id", advertController.getAdvert);
router.post("/category", advertController.newCategory);
router.post("/vehicle", advertController.newVehicleAdvert);
router.post("/residence", advertController.newResidenceAdvert);
router.post("/electronic", advertController.newElectronicAdvert);
router.post("/fashion", advertController.newFashionAdvert);
router.post("/homeAndGarden", advertController.newHomeAndGardenAdvert);
router.post("/secondHand", advertController.newSecondHandAdvert);
router.post("/sparePart", advertController.newSparePartAdvert);
router.delete("/delete/:id", advertController.deleteAdvert);
router.put("/update/:id", advertController.updateAdvert);
router.get("/ilanlar/:id", advertController.getUsersAdverts);
router.get("/getUser/:id", getUser);
router.get("/profile", getProfile);
router.post("/image", advertController.createImage);
router.get("/image", advertController.getImages);
module.exports = router;
