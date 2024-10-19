//import sql
const sql = require("mysql2");

//create connection to db
const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TravelExperts",
});

//export con to different files
module.exports = con;
