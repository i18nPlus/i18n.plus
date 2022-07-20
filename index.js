// Scope variables
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const config = require("./setup/config.js");
const fs = require("fs");
// path bars by platform
const separator = process.platform === "win32" ? "\\" : "/";

// Setting Middleware

// Serves resources from public folder
config.PUBLIC_DIRS.forEach((dir) => {
	app.use(`/${dir}`, express.static(dir));
});

app.get("/getSystemConfig", (req, res) => {
	res.send(config.system);
});

// Fetch a file
app.get("/getFile", cors(config.CORS_ORIGINS), (req, res) => {
	const myPath = path.join(`${__dirname}${separator}${req.query.path}`);
	fs.readFile(myPath, "utf8", (err, file) => {
		if (err) res.send(err);
		res.send(file);
	});
});

// Return Index.html
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, config.OUTPUT_HTML));
});

// Start up Application
app.listen(config.PORT_START);
console.log(`Listening on http://localhost:${config.PORT_START}`);
