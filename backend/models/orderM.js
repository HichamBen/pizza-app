const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    restaurantName: String,
    restLocation: Object,
    clientLocation: Object,
    img: String,
    totalePrice: Number,
    pizzaSelected: Object,
    clientInfo: Object,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Restaurant"
    },
    paymentMethod: String,
    isPay: Boolean,
    isDelivered: Boolean,
    time: {
        type: String,
        default: () => new Date().toLocaleString("fr", {
            dateStyle: "short",
            timeStyle: "short",
        })
    }

}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;