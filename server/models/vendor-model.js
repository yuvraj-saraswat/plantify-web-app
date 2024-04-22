const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});


vendorSchema.pre("save", async function (next) {
  const vendor = this;
  if (!vendor.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(vendor.password, saltRound);
    vendor.password = hash_password;
  } catch (error) {
    next(error);
  }
});

vendorSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

vendorSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const Vendor = new mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
