require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routerPizza = require("./backend/routers/restaurantRouter");
const userRouter = require("./backend/routers/userRouter");
const orderRouter = require("./backend/routers/orderRouter");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");

// Connect DB
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());

// config express-session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // session for 1day
    },
  })
);

// config authentication with passport
require("./backend/config/passportJS");

// config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use Routers middleware
app.use("/api/pizza", routerPizza);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.get("/api/config/googleKey", (req, res) => {
  res.send(process.env.GOOGLE_KEY_MAP);
});
app.get("/api/config/paypalKey", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

app.listen(process.env.PORT, () => {
  console.log(`The server run on http://localhost:${process.env.PORT}`);
});
