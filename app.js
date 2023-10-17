require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./backend/middlewares/credentilas");
const corsOptions = require("./backend/config/corsOptions");
const verifyJWT = require("./backend/middlewares/verifyJWT");

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

/* CONFIGURATION */
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** routes */
app.use("/auth", require("./backend/routes/authRouter"));
app.use("/register", require("./backend/routes/registerRouter"));
app.use("/logout", require("./backend/routes/logoutRouter"));
app.use("/refresh", require("./backend/routes/refreshTokenRouter"));
app.use("/api/pizza", require("./backend/routes/api/restaurantRouter"));

app.use(verifyJWT);
app.use("/api/user", require("./backend/routes/api/userRouter"));
app.use("/api/order", require("./backend/routes/api/orderRouter"));

app.get("/api/config/googleKey", (req, res) => {
  res.send(process.env.GOOGLE_KEY_MAP);
});

app.get("/api/config/paypalKey", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// connect to Mongodb then open the server
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The server run on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log("mongodb error:", err.message);
  });
