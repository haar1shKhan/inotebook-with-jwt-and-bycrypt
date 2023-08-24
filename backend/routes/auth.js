const User = require("../model/User");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const jwt_sec = "legond";
router.get("/", (req, res) => {
  // const user = User(req.body)
  // user.save()
  res.send("this is auth");
});

router.post(
  "/createNewUser",
  [
    body("name", "minimum 5 characters").isLength({ min: 5 }),
    body("email", "should be a email").isEmail(),
    body("password", "minimum 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const success =false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      let user = await User.findOne({ success,email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Email already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = { id: user.id };
      const authtoken = jwt.sign(data, jwt_sec);

      res.json({success:true, authtoken });
    } catch (err) {
      console.error(err.message);
      res.send(500).send("ERROR occured");
    }
  }
);

router.post(
  "/login",
  [
    body("email", "should be a email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const success =false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      console.log(req.body);
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({success, error: "Enter valid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success,error: "Enter valid credentials" });
      }
      const data = { id: user.id };
      const authtoken = jwt.sign(data, jwt_sec);

      res.json({success:true, authtoken });
    } catch (err) {
      console.error(err.message);
      res.send(500).send("ERROR occured");
    }
  }
);

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ERROR occured");
  }
});

module.exports = router;
