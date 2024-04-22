const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontroller.home);
router.route("/register").post(validate(signupSchema), authcontroller.register);
router.route("/login").post(validate(loginSchema), authcontroller.login);
router.route("/user").get(authMiddleware, authcontroller.user);
router.route("/vendor-register").post(validate(signupSchema), authcontroller.vendorRegister);
router.route("/vendor-login").post(validate(loginSchema), authcontroller.vendorLogin);
module.exports = router;
