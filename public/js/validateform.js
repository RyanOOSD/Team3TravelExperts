/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

// Client-side validation
// Create variables for each form field
const firstname = document.querySelector("#floatingFirst");
const lastname = document.querySelector("#floatingLast");
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

// Define regex expressions for client-side form validation
/* 
Matches alphabetical strings that also contain spaces, dashes, and apostrophes
The special characters cannot be leading or trailing characters
*/
const nameRegex = /^([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/;

/* 
Matches alphanumeric strings that contain an apostrophe, underscore or dash
Must contain an "@" prior to the next string, and a period before the last string
The last string must be alphabetical only, between 2-6 characters
*/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

/*
Matches 10 digit numeric strings, following North American phone number length
Broken up into 3 capturing groups to allow for future data manipulation
*/
const phoneRegex = /^([0-9]{3})([0-9]{3})([0-9]{4})$/;

/*
Matches an alphabetical string that can also contain apostrophes, spaces, periods and dashes
String can be a maximum length of 45 characters
*/
const cityRegex = /^[A-Za-z'.\s-]{1,45}$/;

/*
Matches an alphanumeric string in the format of the Canadian postal code, using only valid letters
Each half of the postal code must be separated by a space
*/
const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

/*
Matches an alphanumeric string that can also contain apostrophes, ampersands, commas, spaces, periods and dashes
String can be a maximum of 300 characters
*/
const feedbackRegex = /^[a-zA-Z0-9'&!,\s.-]{1,300}$/;

function formValidation() {
    // Create blank variable to store errors
    let errorMsg = "";

    // Perform basic validation for each field by comparing against regex
    if(!nameRegex.test(firstname.value)) {
        errorMsg += "First name is invalid.\n\n";
    }
    if(!nameRegex.test(lastname.value)) {
        errorMsg += "Last name is invalid.\n\n";
    }
    if(!cityRegex.test(address.value)) {
        errorMsg += "Address is invalid.\n\n";
    }
    if(!cityRegex.test(city.value)) {
        errorMsg += "City is invalid. " +
        "It must only contain alphabetical characters or spaces " +
        "as well as [- or '] special characters\n\n";   
    }
    if(!cityRegex.test(province.value)) {
        errorMsg += "Province is invalid.\n\n";
    }
    if(!postalRegex.test(postal.value)) {
        errorMsg += "Postal code is invalid. " +
        "Ensure it is in the format 'T0A 0A0'.\n\n";
    }
    if(!cityRegex.test(country.value)) {
        errorMsg += "Country is invalid.\n\n";
    }
    if(!phoneRegex.test(homePhone.value)) {
        errorMsg += "Home phone number is invalid. " +
        "Do not include any brackets, spaces, or dashes.\n\n";
    }
    if(!phoneRegex.test(busPhone.value)) {
        errorMsg += "Business phone number is invalid. " +
        "Do not include any brackets, spaces, or dashes.\n\n";
    }
    if(!emailRegex.test(email.value)) {
        errorMsg += "Email is invalid. "+ 
        "Ensure it is in the format 'me@example.com'.\n\n";
    }
    if(!cityRegex.test(username.value)) {
        errorMsg += "Username is invalid.\n\n";
    }
    if(!cityRegex.test(password.value)) {
        errorMsg += "Password is invalid.\n\n";
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
        alert("Form was not submitted.");
        return false;
    }
}