const { readFileSync } = require("fs");
const express = require("express");
const multer = require("multer");

const txt = readFileSync("./test.txt", "utf8");
const app = express();
app.get("/", (req, res) => {
	res.send(txt);
});

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./logos");
	},
	filename: (req, file, cd) => {
		cd(null, Date.now() + "__" + file.originalname);
	},
});
const upload = multer({
	storage: fileStorageEngine,
});

// Routes
app.post("/file", upload.single("file"), (req, res) => {
	console.log(req.file);
	res.send("File upload success");
});

app.listen(5000);
