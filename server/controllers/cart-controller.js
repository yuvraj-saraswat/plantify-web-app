const User = require("../models/user-model");

const addQuantity = async (req, res) => {
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
};

const getQuantity = async (req, res) => {
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
};

const addToCart = async (req, res) => {
  const { userId, nurseryName, plantId, quantity, price, photo_url } = req.body;
  console.log("pikachu ", quantity);
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
          if (user.cart[nurseryIndex].plants.length === 0) {
            user.cart.splice(nurseryIndex, 1);
          }
        } else {
          // Update the quantity
          user.cart[nurseryIndex].plants[plantIndex].quantity = quantity;
        }
      } else {
        // If plant doesn't exist, add a new entry
        if (quantity > 0) {
          user.cart[nurseryIndex].plants.push({
            plantName: plantId,
            quantity: quantity,
            price: price,
            photo_url: photo_url,
          });
        }
      }
    } else {
      // If nursery doesn't exist in the cart, add a new entry
      if (quantity > 0) {
        user.cart.push({
          nursery: nurseryName,
          plants: [
            {
              plantName: plantId,
              quantity: quantity,
              price: price,
              photo_url: photo_url,
            },
          ],
        });
      }
    }

    await user.save();

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the request

    // Find the user by userId and only return the cart details
    const user = await User.findById(userId).select("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user found, return cart details
    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getQuantity, addQuantity, getCart, addToCart };
