const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const appDir = path.dirname(require.main.filename);

/// Set the view engine to EJS
app.set("view engine", "ejs");
console.log("asdasdas: " + path.join(appDir, "public", "views"));
// Set the absolute path to the views directory
app.set("views", path.join(appDir, "public", "views"));

// Serve static files for CSS/JS
app.use(express.static(path.join(appDir, "public")));

// app.set('views', path.join(__dirname, 'views'));
// .. moves 1 dir up where util folders present
const dbPath = path.join(appDir, "util", "db.js");
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

//for / and home to used as same
app.get(["/", "/home"], (req, res) => {
  const query =
    "SELECT PkgName,PkgDesc,PkgBasePrice,\
		day(PkgStartDate) as startDay, month(PkgStartDate) as startMonth, year(PkgStartDate) as startYear,\
    day(PkgEndDate) as endDay, month(PkgEndDate) endMonth, year(PkgEndDate) as endYear\
    FROM packages  where PkgStartDate> NOW();";

  // const query = "SELECT * FROM packages;";

  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.render("index", { package: result });
    }
  });
});

app.get("/contact", (req, res) => {
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
