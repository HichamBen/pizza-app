const User = require("../models/User");
const { generateHash } = require("../config/genValidPwd");
const { isEmail, isStrongPassword } = require("validator");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!isEmail(email)) throw new Error("The email address is not valid!");
    const { hash, salt } = generateHash(password);
    const newUser = User.create({
      username,
      email,
      hash,
      salt,
    });

    res.status(201).json({
      message: `The new user was created.`,
      userID: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleRegister,
};
