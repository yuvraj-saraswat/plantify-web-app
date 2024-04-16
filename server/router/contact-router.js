const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller");
//const validate = require("../middlewares/validate-middleware");
//const {signupSchema, loginSchema} = require("../validators/auth-validator");

router.route("/contact").post(contactForm);
module.exports = router;