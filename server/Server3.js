require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nurseryRouter = require("./router/nursery-router");
const authRoute = require("./router/auth-router");
const vendorRoute = require("./router/vendor-router");
const cartRoute = require("./router/cart-router");
const errorMiddleware = require("./middlewares/error-middleware");
const connectDB = require("./utils/db_mongo");

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
app.use("/api/vendor", vendorRoute)
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
