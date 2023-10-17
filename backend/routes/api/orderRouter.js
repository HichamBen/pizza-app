const router = require("express").Router();
const Order = require("../../models/Order");

router.post("/insert", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).send(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/history", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userID });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/invoice/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).send(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
