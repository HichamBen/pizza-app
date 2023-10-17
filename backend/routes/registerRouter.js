const router = require("express").Router();
const {
  handleRegister,
} = require("../controllers/registerController");

// create a user
router.post("/", handleRegister);

module.exports = router;
