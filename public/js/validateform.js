/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

// Define regex expressions for client-side form validation

// Matches 1 number between 1-9
const travelerRegex = /^[1-9]{1}$/;

/* 
Matches alphabetical strings that also contain spaces, dashes, and apostrophes
The special characters cannot be leading or trailing characters
*/
const nameRegex = /^([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/;

/*
Matches an alphanumeric string that can also contain apostrophes, spaces, periods and dashes
String can be a maximum length of 75 characters
*/
const addressRegex = /^[A-Za-z0-9'.\s-]{1,50}$/;

/*
Matches an alphabetical string that can also contain apostrophes, spaces, periods and dashes
String can be a maximum length of 50 characters
*/
const cityRegex = /^[A-Za-z'.\s-]{1,50}$/;

/*
Matches two character string using only valid starting and ending letters for Canadiian provinces
*/
const provRegex = /^[ABMNOPQSY][BCEKLNSTU]$/;

/*
Matches an alphanumeric string in the format of the Canadian postal code, using only valid letters
Each half of the postal code must be separated by a space
*/
const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

// Matches a string of 1-50 alphabetical characters, including spaces, ampersands and dashes
const countryRegex = /^[A-Za-z\&\s-]{1,50}$/;

/*
Matches 10 digit numeric strings, following North American phone number length
Broken up into 3 capturing groups to allow for future data manipulation
*/
const phoneRegex = /^([0-9]{3})([0-9]{3})([0-9]{4})$/;

/* 
Matches alphanumeric strings that contain an apostrophe, underscore or dash
Must contain an "@" prior to the next string, and a period before the last string
The last string must be alphabetical only, between 2-6 characters
*/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Matches a string of 3-20 alphanumeric characters
const userRegex = /^[A-Za-z0-9]{3,20}/;

// Matches a 8-16 character string that has at least one number and one of the below special character
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

function regValidation() {

    // Create variables for each form field
    const firstName = document.querySelector("#floatingFirst");
    const lastName = document.querySelector("#floatingLast");
    const address = document.querySelector("#floatingAddress");
    const city = document.querySelector("#floatingCity");
    const province = document.querySelector("#floatingProvince");
    const postal = document.querySelector("#floatingPostal");
    const country = document.querySelector("#floatingCountry");
    const homePhone = document.querySelector("#floatingHPhone");
    const busPhone = document.querySelector("#floatingBPhone");
    const email = document.querySelector("#floatingEmail");
    const username = document.querySelector("#floatingUser");
    const password = document.querySelector("#floatingPassword");
    // Create blank variable to store errors
    let errorMsg = "";

    // Perform basic validation for each field by comparing against regex
    if(!nameRegex.test(firstName.value)) {
        errorMsg += "First name is invalid.\n";
    }
    if(!nameRegex.test(lastName.value)) {
        errorMsg += "Last name is invalid.\n";
    }
    if(!addressRegex.test(address.value)) {
        errorMsg += "Address is invalid.\n";
    }
    if(!cityRegex.test(city.value)) {
        errorMsg += "City is invalid. " +
        "It must only contain alphabetical characters or spaces " +
        "as well as [- or '] special characters\n";   
    }
    if(!provRegex.test(province.value)) {
        errorMsg += "Province is invalid.\n";
    }
    if(!postalRegex.test(postal.value)) {
        errorMsg += "Postal code is invalid. " +
        "Ensure it is in the format 'T0A 0A0'.\n";
    }
    if(!countryRegex.test(country.value)) {
        errorMsg += "Country is invalid.\n";
    }
    if(!phoneRegex.test(homePhone.value)) {
        errorMsg += "Home phone number is invalid. " +
        "Do not include any brackets, spaces, or dashes.\n";
    }
    if(!phoneRegex.test(busPhone.value)) {
        errorMsg += "Business phone number is invalid. " +
        "Do not include any brackets, spaces, or dashes.\n";
    }
    if(!emailRegex.test(email.value)) {
        errorMsg += "Email is invalid. "+ 
        "Ensure it is in the format 'me@example.com'.\n";
    }
    if(!userRegex.test(username.value)) {
        errorMsg += "Username is invalid.\n";
    }
    if(!passwordRegex.test(password.value)) {
        errorMsg += "Password is invalid. " +
        "Must contain at least 8 characters, 1 number and 1 symbol.";
    }

    // Check for errors
    if(errorMsg == "") {
        // If no errors, return true - submit form
        return true;
    }
    else {
        // Displays applicable errors in browser alert
        alert(errorMsg);
        // Since there are errors, return false - form is not submitted
        alert("Registration was not submitted.");
        return false;
    }
}

function bookValidation() {

    const numTravelers = document.querySelector("#travelerCount");
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const address = document.querySelector("#address");
    const city = document.querySelector("#city");
    const province = document.querySelector("province");
    const postal = document.querySelector("#postalCode");
    const country = document.querySelector("#country");
    const homePhone = document.querySelector("#homePhone");
    const busPhone = document.querySelector("#busPhone");
    const email = document.querySelector("#email");

    let errorMsg = "";

    if(!travelerRegex.test(numTravelers.value)) {
        errorMsg += "Number of travelers is invalid. " +
        "Please only enter a number between 1 and 9."
    }
    if(!nameRegex.test(firstName.value)) {
        errorMsg += "First name is invalid.\n";
    }
    if(!nameRegex.test(lastName.value)) {
        errorMsg += "Last name is invalid.\n";
    }
    if(!addressRegex.test(address.value)) {
        errorMsg += "Address is invalid.\n";
    }
    if(!cityRegex.test(city.value)) {
        errorMsg += "City is invalid. " +
        "It must only contain alphabetical characters or spaces " +
        "as well as [- or '] special characters\n";   
    }
    if(!cityRegex.test(province.value)) {
        errorMsg += "Province is invalid.\n";
    }
    if(!postalRegex.test(postal.value)) {
        errorMsg += "Postal code is invalid. " +
        "Ensure it is in the format 'T0A 0A0'.\n";
    }
    if(!cityRegex.test(country.value)) {
        errorMsg += "Country is invalid.\n";
    }
    if(!phoneRegex.test(homePhone.value)) {
        errorMsg += "Home phone number is invalid. " +
        "Do not include any brackets, spaces, or dashes.\n";
    }
    if(!phoneRegex.test(busPhone.value)) {
        errorMsg += "Business phone number is invalid. " +
        "Do not include any brackets, spaces, or dashes.\n";
    }
    if(!emailRegex.test(email.value)) {
        errorMsg += "Email is invalid. "+ 
        "Ensure it is in the format 'me@example.com'.\n";
    }

    // Check for errors
    if(errorMsg == "") {
        // If no errors, return true - submit form
        return true;
    }
    else {
        // Displays applicable errors in browser alert
        alert(errorMsg);
        // Since there are errors, return false - form is not submitted
        alert("Booking was not submitted.");
        return false;
    }
}