import express = require("express");
const router = express.Router();
const User = require("@/models/User");

router.post("/register", async (req, res) => {
  try {
    User.register(
      req.body.username,
      req.body.password,
      function (err: any, user: any) {
        let result = err ?? user;
        res.send({
          status: 200,
          message: result,
        });
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user } = await User.authenticate()(
      req.body.username,
      req.body.password
    );
    res.send({
      status: 200,
      message: user,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
