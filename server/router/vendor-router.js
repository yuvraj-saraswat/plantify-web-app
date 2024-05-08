const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendor-controller");
//const multer  = require('multer');
const upload = require("../middlewares/multer-middleware");
//const upload = multer();

router.route("/add-nursery").post(upload.single('image'),/*upload.none(), */vendorController.addNursery);
router.route("/get-nursery/:vendorId").get(vendorController.getNursery);
router.route("/add-plants").post(vendorController.setPlants);
module.exports = router;