import seeder from "mongoose-seed";
import path from "path";
const dotenv = require("dotenv");
dotenv.config();

const normalizedPath = require("path").join(__dirname);
let data: Object[] = [];
let modelsPaths: string[] = [];

require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file: string) {
    if (file.split(".")[0] === "index") return;
    const json = require("./" + file);
    data.push(json);
    modelsPaths.push(json.model);
  });

seeder.connect(process.env.APP_DATABASE ?? "", function () {
  seeder.loadModels(
    modelsPaths.map((filePath) => path.resolve("src/models/" + filePath))
  );
  seeder.populateModels(data, function (err, done) {
    if (err) {
      return console.log("seeder error: ", err);
    }
    if (done) {
      return console.log("seeder done: ", done);
    }
    seeder.disconnect();
  });
});
