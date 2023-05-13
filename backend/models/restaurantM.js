const mongoose = require("mongoose");


const restaurantSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        required: [true, "The name of restaurant is required"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    location: Object,
    img: {
        type: String,
        required: [true, "The img-url of restaurant is required"]
    },
    priceRange: {
        type: [Number],
        required: true
    },
    pizza: {
        type: [Object],
        required: true
    },
    reviews: Number

}, { timestamps: true });


const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;