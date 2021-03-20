import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
const User = require("@/models/User");
const session = require("express-session");
const passport = require("passport");
const mongooseHidden = require("mongoose-hidden")();
const fileUpload = require("express-fileupload");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const port = 8080;

dotenv.config();

/*
Mongoose
 */
mongoose.plugin(mongooseHidden);

mongoose.connect(process.env.APP_DATABASE ?? "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// compression requests
app.use(compression({ threshold: 0 }));

/*
Upload file
 */
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/uploads", express.static("uploads"));

// cross origin
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
