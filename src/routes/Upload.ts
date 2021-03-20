import express = require("express");
const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let data: any = [];
      if (!Array.isArray(req.files.images)) {
        req.files.images = [req.files.images];
      }
      Object.values(req.files.images).forEach((photo) => {
        photo.mv("./uploads/" + photo.name);
        data.push({
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size,
        });
      });
      res.send({
        status: true,
        message: "Files are uploaded",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
