# Travel Experts Agency Website - Threaded Project

This project involves building a dynamic travel agency website using **Express.js** and **MySQL**. Below is a complete guide to set up, run, and troubleshoot your project effectively.

---

## 🛠️ Required Packages

- **mysql2**
- **express**
- **nodemon**
- **ejs**

---

## 📦 Installation and Running

```bash
# Step 1: Initialize the project
npm init -y

# Step 2: Install required dependencies
npm i --save-dev nodemon ejs express mysql2

# Step 3: Start the server
npm run start

# Troubleshooting and self-fix:
# 1. Verify packages installation
npm list

# 2. Ensure package.json has index.js in start script
# Add the following if missing:
# "scripts": {
#   "test": "echo \"Error: no test specified\" && exit 1",
#   "start": "nodemon index.js"
# }

# 3. Check if the DB credentials are correct in your code
# Example:
# const mysql = require('mysql2');
# const connection = mysql.createConnection({
#   host: 'localhost',
#   user: 'your-username',
#   password: 'your-password',
#   database: 'travel_experts'
# });
# connection.connect((err) => {
#   if (err) {
#     console.error('Error connecting to DB:', err.message);
#     return;
#   }
#   console.log('Connected to the MySQL database!');
# });

# Project Structure

/project-root
│
├── /views # EJS templates for rendering
├── /public # Static files (CSS, JS, Images)
├── index.js # Main server file
├── package.json # Project metadata and dependencies
└── README.md # Documentation
```
