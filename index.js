const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const appDir = path.dirname(require.main.filename);
const { body, validationResult } = require("express-validator");
//for encryption
const bcrypt = require("bcrypt");

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
    res.render("index", {
      pageTitle: "Home | Travel Experts",
      package: result,
    });
  });
});

// gets the agent contact details to contact page
app.get("/contact", (req, res) => {
  const agencyQuery = "SELECT * FROM agencies";
  const agentQuery = "SELECT * from agents WHERE AgencyId = 1";
  const agentTwoQuery = "SELECT * from agents WHERE AgencyId = 2";

  db.query(agencyQuery, (err, agencyOut) => {
    if (err) throw err;
    db.query(agentQuery, (err, agentOut) => {
      if (err) throw err;
      db.query(agentTwoQuery, (err, agentTwoOut) => {
        res.render("contact", {
          pageTitle: "Contact Us | Travel Experts",
          agencies: agencyOut,
          agents: agentOut,
          agentTwo: agentTwoOut,
        });
      });
    });
  });
});

app.get("/booking", (req, res) => {
  const packageId = req.query.id;
  console.log(packageId);
  const query = "SELECT * FROM packages WHERE PackageId = ?";
  const agentQuery = "SELECT * FROM agents";

  db.query(query, [packageId], (err, results) => {
    if (err) throw err;
    db.query(agentQuery, (err, agentOut) => {
      res.render("booking", {
        pageTitle: "Booking Form | Travel Experts",
        package: results[0],
        agents: agentOut,
      });
    });
  });
});

app.post(
  "/submit-booking",
  [
    [
      body("travelerCount", "Invalid traveler count")
        .isNumeric()
        .isLength({ max: 1 }),
      body("packageId", "Invalid package ID").isNumeric().isLength({ max: 1 }),
      body("firstName", "Invalid first name")
        .isAlpha("en-US", { ignore: "s.-'" })
        .isLength({ max: 25 }),
      body("lastName", "Invalid last name")
        .isAlpha("en-US", { ignore: "s.-'" })
        .isLength({ max: 25 }),
      body("address", "Invalid address")
        .isAlphanumeric("en-US", { ignore: "s.-'" })
        .isLength({ max: 75 }),
      body("city", "Invalid city")
        .isAlpha("en-US", { ignore: "s.-'" })
        .isLength({ max: 50 }),
      body("province", "Invalid province").isAlpha().isLength({ max: 2 }),
      body("postalCode", "Invalid postal code")
        .isAlphanumeric("en-US", { ignore: "s" })
        .isLength({ max: 7 }),
      body("country", "Invalid country")
        .isAlpha("en-US", { ignore: "&s-'" })
        .isLength({ max: 25 }),
      body("homePhone", "Invalid home phone").isNumeric().isLength({ max: 20 }),
      body("busPhone", "Invalid business phone")
        .isNumeric()
        .isLength({ max: 20 }),
      body("email", "Invalid email").isEmail().isLength({ max: 50 }),
      body("tripType", "Invalid trip type").isAlpha().isLength({ max: 1 }),
      body("agentId", "Invalid agent").isNumeric().isLength({ max: 1 }),
    ],
  ],
  async (req, res) => {
    console.log("submit-booking", req.body);
    const error = validationResult(req);
    const pullErr = validationResult.withDefaults({
      formatter: (error) => error.msg,
    });
    const printErr = pullErr(req).array();

    if (!error.isEmpty()) {
      return res.render("badform", {
        pageTitle: "Invalid form!",
        badSubmit: printErr,
      });
    }
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
      tripType,
    } = req.body;

    try {
      // random customer and booking id generation
      const customerId = generateNo();
      const bookingId = generateNo();
      const bookingNo = generateNo();

      // Insert customer into `customers` table
      const customerQuery = `
        INSERT INTO customers (CustomerId,CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail, AgentId)
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        agentId,
      ];
      //You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(),
      await db.promise().query(customerQuery, customerValues);

      // Get the customer that was just created and input the ID into the booking table
      const newCustomer =
        "SELECT CustomerId FROM customers ORDER BY CustomerID DESC LIMIT 1";
      const newId = await db.promise().query(newCustomer);
      // const customerId = JSON.stringify(newId[0][0].CustomerId);
      // Insert booking into `bookings` table
      const bookingQuery = `
        INSERT INTO bookings (BookingId, BookingDate, BookingNo, TravelerCount, CustomerId, TripTypeId, PackageId)
        VALUES (?,NOW(), ?, ?, ?, ?, ?)
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
      res.render("thankbook");
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).send("Error processing booking.");
    }
  }
);

// Endpoint to serve registration page
app.get("/register", async (req, res) => {
  const agentQuery = "SELECT * FROM agents";
  db.query(agentQuery, (err, agentOut) => {
    res.render("register", {
      pageTitle: "Register | Travel Experts",
      agents: agentOut,
    });
  });
});

// Endpoint to handle registration submissions
app.post(
  "/submit-registration",
  [
    [
      body("firstName", "Invalid first name")
        .isAlpha("en-US", { ignore: "s.-'" })
        .isLength({ max: 25 }),
      body("lastName", "Invalid last name")
        .isAlpha("en-US", { ignore: "s.-'" })
        .isLength({ max: 25 }),
      body("address", "Invalid address")
        .isAlphanumeric("en-US", { ignore: "s.-'" })
        .isLength({ max: 75 }),
      body("city", "Invalid city")
        .isAlpha("en-US", { ignore: "s.-'" })
        .isLength({ max: 50 }),
      body("province", "Invalid province").isAlpha().isLength({ max: 2 }),
      body("postalCode", "Invalid postal code")
        .isAlphanumeric("en-US", { ignore: "s" })
        .isLength({ max: 7 }),
      body("country", "Invalid country")
        .isAlpha("en-US", { ignore: "&s-'" })
        .isLength({ max: 25 }),
      body("homePhone", "Invalid home phone").isNumeric().isLength({ max: 20 }),
      body("busPhone", "Invalid business phone")
        .isNumeric()
        .isLength({ max: 20 }),
      body("email", "Invalid email").isEmail().isLength({ max: 50 }),
      body("username", "Invalid username")
        .isAlphanumeric()
        .isLength({ min: 3, max: 20 }),
      body("password", "Invalid password")
        .isAlphanumeric("en-US", { ignore: "!@#$%^&*" })
        .isLength({ min: 8, max: 24 }),
      body("confirmpassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true; // Indicates the validation passed.
      }),
      body("agentId", "Invalid agent").isNumeric().isLength({ max: 1 }),
    ],
  ],

  (req, res) => {
    const error = validationResult(req);
    const pullErr = validationResult.withDefaults({
      formatter: (error) => error.msg,
    });
    const printErr = pullErr(req).array();

    if (!error.isEmpty()) {
      return res.render("badform", {
        pageTitle: "Invalid form!",
        badSubmit: printErr,
      });
    }
    const customerId = generateNo();
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
      agentId,
      username,
      password,
      confirmpassword,
    } = req.body;
    console.log(req.body);
    //first register user creds in new user table
    //check if username(pk) already exists
    const userexists = "select * from users where username = ?";
    db.query(userexists, [username], (err, results) => {
      if (err) throw err;
      console.log("userexists: ", results.length == 0);
      if (results.length > 0) {
        return res.render("badform", {
          pageTitle: "username already exists",
          badSubmit: [username + " already exists"],
        });
      }
      const insertUser =
        "INSERT INTO users (uid, username,password) VALUES (?,?,?);";
      var saltRounds = 10; //how complex u wanna keep your encryption

      bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          return err;
        }
        var userVals = [customerId, username, hash];

        db.query(insertUser, userVals);
      });
      // bcrypt.compare(password, hashGen).then(function (result) {
      //   console.log("bcrypt result: ", result);
      // });
      const registerCustomer = `
        INSERT INTO customers (CustomerId,CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail, AgentId)
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const customerInput = [
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
        agentId,
      ];
      db.promise().query(registerCustomer, customerInput);
      console.log(agentId);
      res.render("thankregister");
    });
  }
);

// Create generic endpoint to serve error for invalid requests
app.use((req, res) => {
  res.render("error", {
    pageTitle: "Error! | Travel Experts",
    invalidUrl: req.url,
  });
});

// Function to generate a random Number
function generateNo() {
  return Math.floor(100 + Math.random() * 900); // Generates a number between 100-999
}
