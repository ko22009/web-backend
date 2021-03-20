import express = require("express");
const router = express.Router();

const normalizedPath = require("path").join(__dirname);

require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file: string) {
    if (file.split(".")[0] === "index") return;
    const route = require("./" + file);
    router.use(route);
  });

router.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = router;
