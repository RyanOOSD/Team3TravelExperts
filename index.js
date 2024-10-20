const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const appDir = path.dirname(require.main.filename);

/// Set the view engine to EJS
app.set("view engine", "ejs");
// console.log("asdasdas: " + path.join(appDir, "public", "views"));
// Set the absolute path to the views directory
app.set("views", path.join(appDir, "public", "views"));

// Serve static files for CSS/JS
app.use(express.static(path.join(appDir, "public")));

//for req body
app.use(express.urlencoded({ extended: true }));

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
  // this returns the basic detils from packages and with seperate date that splits as
  // date month and year for start and end of the package.
  const query =
    "SELECT PackageId,PkgName,PkgDesc,PkgBasePrice,\
		day(PkgStartDate) as startDay, month(PkgStartDate) as startMonth, year(PkgStartDate) as startYear,\
    day(PkgEndDate) as endDay, month(PkgEndDate) endMonth, year(PkgEndDate) as endYear\
    FROM packages where PkgStartDate> NOW()";

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

// gets the agent contact details to contact page
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

app.get("/booking", (req, res) => {
  const packageId = req.query.id;
  console.log(packageId);
  const query = "SELECT * FROM packages WHERE PackageId = ?";

  db.query(query, [packageId], (err, results) => {
    if (err) throw err;
    res.render("booking", { package: results[0] });
  });
});

app.post("/submit-booking", async (req, res) => {
  console.log("submit-booking", req.body);
  const {
    travelerCount,
    packageId,
    firstName,
    lastName,
    address,
    city,
    province,
    postalCode,
    country,
    homePhone,
    busPhone,
    email,
  } = req.body;

  try {
    const customerId = generateNo();
    const bookingId = generateNo();
    const bookingNo = generateNo();
    const tripType = "L"; // Fixed value for leisure trip

    // Insert customer into `customers` table
    const customerQuery = `
      INSERT INTO customers (CustomerId, CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const customerValues = [
      customerId,
      firstName,
      lastName,
      address,
      city,
      province,
      postalCode,
      country,
      homePhone,
      busPhone,
      email,
    ];
    //You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(),
    await db.promise().query(customerQuery, customerValues);

    // Insert booking into `bookings` table
    const bookingQuery = `
      INSERT INTO bookings (BookingId, BookingDate, BookingNo, TravelerCount, CustomerId, TripTypeId, PackageId)
      VALUES (?, NOW(), ?, ?, ?, ?, ?)
    `;
    const bookingValues = [
      bookingId,
      bookingNo,
      travelerCount,
      customerId,
      tripType,
      packageId,
    ];
    await db.promise().query(bookingQuery, bookingValues);

    console.log("Booking and customer data saved successfully");
    res.render("thankyou");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error processing booking.");
  }
});

// Endpoint to serve registration page
app.get("/register", async(req, res) => {
  res.render("register");
});

// Create generic endpoint to serve error for invalid requests
app.use((req, res) => {
  res.status(400).send("400: Bad Request");
});

// Function to generate a random Number
function generateNo() {
  return Math.floor(100 + Math.random() * 900); // Generates a number between 100-999
}
