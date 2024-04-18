require("dotenv").config();
const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");
const nurseryRouter = require("./router/nursery-router");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const errorMiddleware = require("./middlewares/error-middleware");
const connectDB = require("./utils/db_mongo");

const app = express();
const PORT = 3000;

const User = require("./models/user-model");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", nurseryRouter);

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.patch("/add-quantity", async (req, res) => {
  const { userId, nurseryName, quantity } = req.body;
  console.log("Hello hello", userId);
  console.log(userId, nurseryName, quantity);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingQuantityIndex = user.quantities.findIndex(
      (item) => item.nursery === nurseryName
    );

    if (existingQuantityIndex !== -1) {
      user.quantities[existingQuantityIndex].quantities = quantity;
    } else {
      user.quantities.push({ nursery: nurseryName, quantities: quantity });
    }

    await user.save();
    console.log("Done");
    return res.status(200).json({ message: "Quantity added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/nursery/:userId/quantities/:nurseryName", async (req, res) => {
  const { userId, nurseryName } = req.params;
  console.log("Hello 123", userId);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let resQuantities = {};

    const existingQuantityIndex = user.quantities.findIndex(
      (item) => item.nursery === nurseryName
    );

    resQuantities = user.quantities[existingQuantityIndex].quantities;

    console.log("gg");
    return res.status(200).json(resQuantities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.patch("/add-to-cart", async (req, res) => {
  const { userId, nurseryName, plantId, quantity, price, photo_url } = req.body;
  console.log("Bhalu");
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const nurseryIndex = user.cart.findIndex(
      (item) => item.nursery === nurseryName
    );

    if (nurseryIndex !== -1) {
      // If nursery already exists in the cart
      const plantIndex = user.cart[nurseryIndex].plants.findIndex(
        (plant) => plant.plantName === plantId
      );

      if (plantIndex !== -1) {
        // If plant already exists, update the quantity or remove if 0
        if (quantity === 0) {
          // Remove the plant if quantity is 0
          user.cart[nurseryIndex].plants.splice(plantIndex, 1);
        } else {
          // Update the quantity
          user.cart[nurseryIndex].plants[plantIndex].quantity = quantity;
        }
      } else {
        // If plant doesn't exist, add a new entry
        if (quantity > 0) {
          user.cart[nurseryIndex].plants.push({
            plantId,
            quantity,
            price,
            photo_url,
          });
        }
      }
    } else {
      // If nursery doesn't exist in the cart, add a new entry
      if (quantity > 0) {
        user.cart.push({
          nurseryName,
          plants: [{ plantId, quantity, price, photo_url }],
        });
      }
    }

    await user.save();

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
