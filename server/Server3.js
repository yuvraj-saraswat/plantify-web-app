require("dotenv").config();
const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");
const nurseryRouter = require("./router/nursery-router");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const cartRoute = require("./router/cart-router");
const errorMiddleware = require("./middlewares/error-middleware");
const connectDB = require("./utils/db_mongo");
const User = require("./models/user-model");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", nurseryRouter);
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
app.use(errorMiddleware);

//app.use("/api/form", contactRoute);
//app.use("/api/data", serviceRoute);
//app.use("/api/admin", adminRoute);

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
