const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

const serverFolder = "./public/Files";
let fileList = [];

app.get("/", (req, res) => {
  fileList = [];
  fs.readdirSync(serverFolder).forEach((file) => {
    fileList.push(file);
  });
  res.render("home", { fileList: fileList });
});

app.get("/download/:fileName", (req, res) => {
  fileList.forEach((file) => {
    if (file.includes(req.params.fileName)) {
      res.download("./public/Files/" + file, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  });
});

app.listen("3000", () => {
  console.log("Server started at port 3000");
});
