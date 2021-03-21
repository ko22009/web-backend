import express = require("express");
import userService from "@/services/userService";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await userService.register(login, password);
    res.send({
      status: 200,
      message: result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const { status, message } = await userService.login(login, password);
    res.send({
      status: status,
      message: message,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
