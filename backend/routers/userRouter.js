const router = require("express").Router();
const passport = require("passport");
const User = require("../models/userM");
const { genePassword } = require("../gen&valid");

// check email middleware
const checkEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    req.isExistedEmail = true;
  } else {
    req.isExistedEmail = false;
  }
  next();
};

// success auth middleware
const successAuth = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await User.findById(req.session.passport.user);

      res
        .status(200)
        .json({
          user: user,
          isAuth: req.isAuthenticated(),
          isExistedEmail: false,
        });
    } catch (err) {
      console.log(err.message);
    }
  } else {
    res.status(401).json({ message: "401 Unauthorized", isAuth: false });
  }
};

router.get("/login", successAuth);

router.post("/login", (req, res, next) => {
  next();
});

router.post("/signup", checkEmail, (req, res, next) => {
  if (req.isExistedEmail) {
    res.json({ isExistedEmail: true });
  } else {
    const credentials = genePassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      salt: credentials.salt,
      hash: credentials.hash,
    });

    newUser.save(err => {
      if (err) throw err.message;
      next();
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ isAuth: req.isAuthenticated() });
});

// Insert user informations to User doc
router.post(
  "/change/:id",
  async (req, res, next) => {
    const user = await User.findById(req.params.id);
    user.username = req.body.username;
    user.userInfo = req.body.userInfo;
    try {
      await user.save();
      next();
    } catch (err) {
      console.log(err.message);
    }
  },
  successAuth
);

// Dete user account
router.delete("/delete/:userId", async (req, res) => {
  console.log(req.body);
  await User.findByIdAndDelete(req.params.userId);
  req.logout();
  res.status(200).json({ isAuth: req.isAuthenticated() });
});

// authenticate with google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/home",
  passport.authenticate("google", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.redirect("https://pizza-app-mern.onrender.com/login/?isAuth=true");
  }
);

// authenticate with facebook
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/home",
  passport.authenticate("facebook", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.redirect("https://pizza-app-mern.onrender.com/login/?isAuth=true");
  }
);
// Authenticate with local Strategy
router.use(passport.authenticate("local"), successAuth);

module.exports = router;
