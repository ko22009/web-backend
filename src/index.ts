import express from "express";
const fileUpload = require("express-fileupload");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(compression({ threshold: 0 }));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/upload", async (req, res) => {
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

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
