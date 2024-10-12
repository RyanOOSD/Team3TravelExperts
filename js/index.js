const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const appDir = path.dirname(require.main.filename);

// app.set('views', path.join(__dirname, 'views'));
// .. moves 1 dir up where util folders present
console.log(path.join(appDir, "..", "util", "db.js"));
// Require the db.js file
const db = require(path.join(appDir, "..", "util", "db.js"));

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("db connected");
  }
});
// const con = require(path.join(__dirname, "util/db.js"));
app.listen(port, () => {
  console.log("server running at:", port);
});
