const express = require("express");
const router = express.Router();
const cartcontroller = require("../controllers/cart-controller");
//const authMiddleware = require("../middlewares/auth-middleware");

router.route("/add-quantity").patch(cartcontroller.addQuantity);
router.route("/get-quantity/:userId/:nurseryName").get(cartcontroller.getQuantity);
router.route("/add-to-cart").patch(cartcontroller.addToCart);
router.route("/get-cart/:userId").get(cartcontroller.getCart);
module.exports = router;
