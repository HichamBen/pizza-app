const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshJWT) return res.sendStatus(401);

  const refreshToken = cookies.refreshJWT;
  res.clearCookie("refreshJWT", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  try {
    const foundUser = await User.findOne({
      refreshTokens: refreshToken,
    }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
      let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      console.log("attempted refresh token reuse!");

      const hackedUser = await User.findOne({
        email: decoded.email,
      }).exec();

      hackedUser.refreshTokens = [];
      const result = await hackedUser.save();
      return res.sendStatus(403); //Forbidden
    }

    // remove the old refreshToken from arrayJWT on founded user
    const newRefreshTokenArray = foundUser.refreshTokens.filter(
      rt => rt !== refreshToken
    );

    let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (foundUser.email !== decoded.email) return res.sendStatus(403);

    // Refresh token was still valid
    const accessToken = jwt.sign(
      {
        userID: foundUser._id,
        username: foundUser.username,
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const newRefreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    // Saving refreshToken with current user
    foundUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("refreshJWT", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRefreshToken };
