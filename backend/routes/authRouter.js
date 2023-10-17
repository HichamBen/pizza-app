const router = require("express").Router();
const { handleLogin } = require("../controllers/authController");

// authentification
router.post("/", handleLogin);

module.exports = router;


module.exports = router;
