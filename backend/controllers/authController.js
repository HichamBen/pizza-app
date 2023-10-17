const User = require("../models/User");
const { isValidPass } = require("../config/genValidPwd");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  // check the credenatials was send with the req
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "The email address and the password are required!" });

  try {
    // check if the user is exists
    const theUser = await User.findOne({ email }).exec();
    if (!theUser)
      return res.status(401).json({ message: "The email is not found!" }); // Unauthorized

    // evaluate password
    const match = isValidPass(password, theUser.hash, theUser.salt);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        {
          userID: theUser._id,
          username: theUser.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      const newRefreshToken = jwt.sign(
        {
          email: theUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      // clear refreshToken from array of tokens on user if exist
      let newRefreshTokenArray = cookies?.refreshJWT
        ? theUser.refreshTokens.filter(rt => rt !== cookies.refreshJWT)
        : theUser.refreshTokens;

      if (cookies?.refreshJWT) {
        /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */

        const foundToken = await User.findOne({
          refreshTokens: cookies.refreshJWT,
        }).exec();

        // Detected refresh token reuse!
        if (!foundToken) {
          console.log("attempted refresh token reuse at login!");
          // clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
        }

        // clear it from cookie
        res.clearCookie("refreshJWT", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      }

      // Saving refreshToken with current user
      theUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
      const result = await theUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("refreshJWT", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      // Send access token to user
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "The password isn't correct." }); // Unauthorized
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleLogin,
};
