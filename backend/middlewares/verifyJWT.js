const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // Unauthorized;
  const token = authHeader.split(" ")[1];

  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    res.sendStatus(403); //invalid token
  }
};

module.exports = verifyJWT;
