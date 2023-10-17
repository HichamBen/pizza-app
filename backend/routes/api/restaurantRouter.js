const express = require("express");
const pizzaRouter = express.Router();
const RestaurantM = require("../../models/Restaurant");
// const data = require("../../restaurants");

pizzaRouter.get("/insert", async (req, res) => {
  // const result = await RestaurantM.insertMany(data);
  // res.status(200).send(result);
  res.send("The items was inserted before");
});

pizzaRouter.get("/restaurants", async (req, res) => {
  const {
    pageSize = 6,
    page = 1,
    search = "",
    maxPrice = 200,
    rating = 0,
  } = req.query;

  try {
    const restaurants = await RestaurantM.find({
      $or: [
        { restaurant: { $regex: new RegExp(search, "i") } },
        { "pizza.type": { $regex: new RegExp(search, "i") } },
      ],
    })
      .where("rating")
      .gte(rating)
      .where("priceRange")
      .lte(maxPrice)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await RestaurantM.countDocuments({
      $or: [
        { restaurant: { $regex: new RegExp(search, "i") } },
        { "pizza.type": { $regex: new RegExp(search, "i") } },
      ],
    })
      .where("rating")
      .gte(rating)
      .where("priceRange")
      .lte(maxPrice);

    res.status(200).json({ restaurants, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

pizzaRouter.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await RestaurantM.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = pizzaRouter;
