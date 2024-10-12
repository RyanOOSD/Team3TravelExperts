const sql = require("mysql2");
const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TravelExperts",
});

module.exports = con;
