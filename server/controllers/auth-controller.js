const User = require("../models/user-model");
const Vendor = require("../models/vendor-model");
//const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Homepage Controller");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    //res.status(500).json("Internal Server error");
    next(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

const vendorRegister = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const vendorExist = await Vendor.findOne({ email: email });

    if (vendorExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const vendorCreated = await Vendor.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: "Registration Successful",
      token: await vendorCreated.generateToken(),
      userId: vendorCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendorExist = await Vendor.findOne({ email });

    if (!vendorExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //const user = await bcrypt.compare(password, vendorExist.password);

    const vendor = await vendorExist.comparePassword(password);

    if (vendor) {
      res.status(200).json({
        msg: "Login Successful",
        token: await vendorExist.generateToken(),
        userId: vendorExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    //res.status(500).json("Internal Server error");
    next(error);
  }
};

const vendorDetails = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });
      } catch (error) {
        console.log(`error from the user route ${error}`);
      }
  };

module.exports = { home, register, login, user, vendorRegister, vendorLogin, vendorDetails };
