const User = require("../models/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.refreshJWT) return res.sendStatus(204); //No content
  const refreshToken = cookies.refreshJWT;

  try {
    // Is refreshToken in db?
    const foundUser = await User.findOne({
      refreshTokens: refreshToken,
    }).exec();
    if (!foundUser) {
      res.clearCookie("refreshJWT", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshTokens = foundUser.refreshTokens.filter(
      rt => rt !== refreshToken
    );
    await foundUser.save();
    
    res.clearCookie("refreshJWT", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogout };
