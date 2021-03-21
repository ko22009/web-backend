import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
const mongooseHidden = require("mongoose-hidden")();
const fileUpload = require("express-fileupload");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const port = 8080;

dotenv.config();

mongoose.plugin(mongooseHidden);

mongoose.connect(process.env.APP_DATABASE ?? "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

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
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
