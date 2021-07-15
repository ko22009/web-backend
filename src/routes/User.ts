import express = require("express");
import userService, { isFoundUser } from "@/services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { login, password } = req.body;
    const userResponse = await userService.register(login, password);
    res.json(userResponse);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const { status, message } = await userService.login(login, password);
    if (isFoundUser(message)) {
      req.session.user_id = message.id;
    }
    res.json({
      status: status,
      message: message,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => console.log(err));
});

module.exports = router;
