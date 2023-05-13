const router = require("express").Router();
const Order = require("../models/orderM");


router.post("/insert", async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(200).send(newOrder)
    } catch (err) {
        console.log(err.message)
    }

});

router.get("/history/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.status(200).send(orders)
    } catch (err) {
        console.log(err.message)
    }

});

router.get("/invoice/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(200).send(order)
    } catch (err) {
        console.log(err.message)
    }

});




module.exports = router;