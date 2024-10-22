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

// Allow express to handle JSON for validation
app.use(express.json());

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
  if (err) throw err;
    console.log("db connected");
});

//for / and home to used as same
app.get(["/", "/home"], (req, res) => {
  // this returns the basic detils from packages and with seperate date that splits as
  // date month and year for start and end of the package.
  const query =
    "SELECT PackageId, PkgName, PkgDesc, TRUNCATE(PkgBasePrice, 2) AS PkgBasePrice,\
		day(PkgStartDate) AS startDay, month(PkgStartDate) AS startMonth, year(PkgStartDate) AS startYear,\
    day(PkgEndDate) AS endDay, month(PkgEndDate) endMonth, year(PkgEndDate) AS endYear\
    FROM packages WHERE PkgStartDate> NOW()";

  // const query = "SELECT * FROM packages;";

  db.query(query, (err, result) => {
    if (err) throw err;
      console.log(result);
      res.render("index", {pageTitle: "Home | Travel Experts", package: result });
  });
});

// gets the agent contact details to contact page
app.get("/contact", (req, res) => {
  const agencyQuery = "SELECT * FROM agencies"
  const agentQuery = "SELECT * from agents WHERE AgencyId = 1";
  const agentTwoQuery = "SELECT * from agents WHERE AgencyId = 2";

  db.query(agencyQuery, (err, agencyOut) => {
    if (err) throw err;
      db.query(agentQuery, (err, agentOut) => {
        if (err) throw err;
          db.query(agentTwoQuery, (err, agentTwoOut) => {
            res.render("contact", {pageTitle: "Contact Us | Travel Experts", agencies: agencyOut, agents: agentOut, agentTwo: agentTwoOut});
          });
      });
  });
});

app.get("/booking", (req, res) => {
  const packageId = req.query.id;
  console.log(packageId);
  const query = "SELECT * FROM packages WHERE PackageId = ?";
  const agentQuery = "SELECT * FROM agents";

  db.query(query, [packageId],  (err, results) => {
    if (err) throw err;
      db.query(agentQuery, (err, agentOut) => {
       res.render("booking", {pageTitle: "Booking Form | Travel Experts", package: results[0], agents: agentOut });
    });
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
    agentId,
  } = req.body;

  try {
    const bookingNo = generateNo();
    const tripType = "L"; // Fixed value for leisure trip

    // Insert customer into `customers` table
    const customerQuery = `
      INSERT INTO customers (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail, AgentId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const customerValues = [
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
      agentId,
    ];
    //You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(),
    await db.promise().query(customerQuery, customerValues);

    // Get the customer that was just created and input the ID into the booking table
    const newCustomer = "SELECT CustomerId FROM customers ORDER BY CustomerID DESC LIMIT 1";
    const newId = await db.promise().query(newCustomer);
    const customerId = JSON.stringify(newId[0][0].CustomerId);
    // Insert booking into `bookings` table
    const bookingQuery = `
      INSERT INTO bookings (BookingDate, BookingNo, TravelerCount, CustomerId, TripTypeId, PackageId)
      VALUES (NOW(), ?, ?, ?, ?, ?)
    `;
    const bookingValues = [
      bookingNo,
      travelerCount,
      customerId,
      tripType,
      packageId,
    ];
    await db.promise().query(bookingQuery, bookingValues);

    console.log("Booking and customer data saved successfully");
    res.render("thankbook");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error processing booking.");
  }
});

// Endpoint to serve registration page
app.get("/register", async(req, res) => {
  const agentQuery = "SELECT * FROM agents";
  db.query(agentQuery, (err, agentOut) => { 
    res.render("register", {pageTitle: "Register | Travel Experts", agents: agentOut});
  });
});

// Endpoint to handle registration submissions
app.post("/submit-registration", async(req, res) => {
  const { 
    firstName,
    lastName,
    email,
    homePhone,
    busPhone,
    address,
    city,
    province,
    postalCode,
    country,
    username,
    password,
    agentId,
  } = req.body
  const registerCustomer = `
    INSERT INTO customers (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail, CustUser, CustPass, AgentId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const customerInput = [
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
    username,
    password,
    agentId,
  ];
  await db.promise().query(registerCustomer, customerInput)
  console.log(agentId)
  res.render("thankregister");
});

// Create generic endpoint to serve error for invalid requests
app.use((req, res) => {
  res.render("error", {pageTitle: "Error! | Travel Experts", invalidUrl: req.url})
});

// Function to generate a random Number
function generateNo() {
  return Math.floor(100 + Math.random() * 900); // Generates a number between 100-999
}
