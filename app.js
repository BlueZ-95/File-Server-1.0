const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
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

//Multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Files");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

var uploadDisk = multer({
  storage: storage
});
//

app.get("/", (req, res) => {
  fileList = [];
  fs.readdirSync(serverFolder).forEach((file) => {
    fileList.push(file);
  });
  res.render("home", {
    fileList: fileList
  });
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

app.post("/upload", uploadDisk.single("fileToUpload"), (req, res) => {
  res.redirect("/");
});

app.listen("3000", () => {
  console.log("Server started at port 3000");
});