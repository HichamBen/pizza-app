const User = require("../../models/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.userID).select(
      "email username userInfo"
    );
    res
      .status(200)
      .json({ email: user.email, username: user.username, ...user.userInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Insert user informations to User doc
router.post("/change", async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    user.username = req.body.username;
    user.userInfo = req.body.userInfo;
    await user.save();
    res
      .status(200)
      .json({ email: user.email, username: user.username, ...user.userInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dete user account
router.delete("/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userID);
    res.status(200).json(`The user ${req.userID} was succeffuly deleted`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
