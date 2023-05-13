const express = require("express");
const pizzaRouter = express.Router();
const RestaurantM = require("../models/restaurantM");
// const data = require("../restaurants");

pizzaRouter.get("/insert", async (req, res) => {
    // const result = await RestaurantM.insertMany(data);
    // res.status(200).send(result);
    res.send("The items was inserted before");
});

pizzaRouter.get("/restaurants", async (req, res) => {

    try {
        const restaurants = await RestaurantM.find({});
        res.status(200).json(restaurants);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

pizzaRouter.get("/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await RestaurantM.findById(req.params.id);
        res.status(200).json(restaurant);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = pizzaRouter;