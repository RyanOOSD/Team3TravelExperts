const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const appDir = path.dirname(require.main.filename);

//setup ejs as main view
app.set("view engine", "ejs");

// app.set('views', path.join(__dirname, 'views'));
// .. moves 1 dir up where util folders present
const dbPath = path.join(appDir, "..", "util", "db.js");
// console.log(dbPath);

// importing connection from the db.js file
const db = require(dbPath);

// const con = require(path.join(__dirname, "util/db.js"));
app.listen(port, () => {
  console.log("server running at:", port);
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("db connected");
  }
});

app.get("/", (req, res) => {
  const query = "select * from agents";

  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.render("contact", { agents: result });
    }
  });
});
