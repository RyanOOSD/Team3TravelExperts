function inputDisplay()
{
    document.getElementById('HPhone').innerText = 'Enter your Home Phone number as (### ###-####)'
    document.getElementById('BPhone').innerText = 'Enter your Business Phone number as (### ###-####)'
    document.getElementById('Postal').innerText = 'Your Postal Code should be similar to T2C 5P6'
}

/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Threaded Project
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
const addressRegex = /^[A-Za-z0-9'.\s-]{1,75}$/;

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
const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

// Matches a string of 1-50 alphabetical characters, including spaces, apostrophes, ampersands and dashes
const countryRegex = /^[A-Za-z'\&\s-]{1,50}$/;

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

// Matches a 8-32 character string that has at least one number and one of the below special character
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

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
        errorMsg += "First name is invalid.\n" +
        "Ensure it only contains up to 25 alphabetical characters, " +
        "spaces and the following characters [- . '].\n";
    }
    if(!nameRegex.test(lastName.value)) {
        errorMsg += "Last name is invalid.\n " + 
        "Ensure it only contains up to 25 alphabetical characters, " +
        "spaces and the following characters [- . '].\n";
    }
    if(!addressRegex.test(address.value)) {
        errorMsg += "Address is invalid.\n"; +
        "Ensure it only contains up to 75 alphanumeric characters, " +
        "spaces and the following characters [- . '].\n"
    }
    if(!cityRegex.test(city.value)) {
        errorMsg += "City is invalid.\n" +
        "Ensure it only contains up to 50 alphabetical characters," +
        "spaces and the following characters [- . or '].\n";   
    }
    if(!provRegex.test(province.value)) {
        errorMsg += "Province is invalid.\n" + 
        "Please select a valid province from the list.";
    }
    if(!postalRegex.test(postal.value)) {
        errorMsg += "Postal code is invalid.\n" +
        "Ensure it is in the format 'T0A0A0'.\n";
    }
    if(!countryRegex.test(country.value)) {
        errorMsg += "Country is invalid.\n" + 
        "Ensure it only contains up to 50 alphabetical characters," +
        "spaces and the folowing characters [' &].\n";
    }
    if(!phoneRegex.test(homePhone.value)) {
        errorMsg += "Home phone number is invalid.\n" +
        "Ensure it contains 10 numerical characters, " +
        "in the format 4031234567.\n";
    }
    if(!phoneRegex.test(busPhone.value)) {
        errorMsg += "Business phone number is invalid. " +
        "Ensure it contains 10 numerical characters, " +
        "in the format 4031234567.\n";
    }
    if(!emailRegex.test(email.value)) {
        errorMsg += "Email is invalid.\n" + 
        "Ensure it contains up to 50 alphanumeric characters, " +
        "in the format myemail@example.com.\n";
    }
    if(!userRegex.test(username.value)) {
        errorMsg += "Username is invalid.\n" +
        "Ensure it contains up to 20 alphanumeric characters.";
    }
    if(!passwordRegex.test(password.value)) {
        errorMsg += "Password is invalid.\n" +
        "Ensure it contains between 8 and 32 characters with at least 1 number, " +
        "as well as 1 of the following symbols [! @ # $ % ^ & *].\n";
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

    const pkgId = document.querySelector("#packageNumId");
    const pkgName = document.querySelector("#packageNameId");
    const pkgPrice = document.querySelector("#packagePriceId");
    const pkgStart = document.querySelector("#packageStartId");
    const pkgEnd = document.querySelector("#packageEndId");
    const numTravelers = document.querySelector("#travelerCountId");
    const tripType = document.querySelector("#tripTypeId")
    const firstName = document.querySelector("#firstNameId");
    const lastName = document.querySelector("#lastNameId");
    const address = document.querySelector("#addressId");
    const city = document.querySelector("#cityId");
    const province = document.querySelector("#provinceId");
    const postal = document.querySelector("#postalCodeId");
    const country = document.querySelector("#countryId");
    const homePhone = document.querySelector("#homePhoneId");
    const busPhone = document.querySelector("#busPhoneId");
    const email = document.querySelector("#emailId");

    let errorMsg = "";

    if(pkgId == "") {
        errorMsg += "Invalid package form.";
    }
    if(pkgName == "") {
        errorMsg += "Invalid package name.";
    }
    if(pkgPrice == "") {
        errorMsg += "Invalid package price.";
    }
    if(pkgStart == "") {
        errorMsg += "Invalid package start.";
    }
    if(pkgEnd == "") {
        errorMsg += "Invalid package end.";
    }
    if(tripType == "") {
        errorMsg += "Please select a valid trip type."
    }
    if(!travelerRegex.test(numTravelers.value)) {
        errorMsg += "Number of travelers is invalid.\n" +
        "Please only enter a number between 1 and 9.\n";
    }
    if(!nameRegex.test(firstName.value)) {
        errorMsg += "First name is invalid.\n" +
        "Ensure it only contains up to 25 alphabetical characters, " +
        "spaces and the following characters [- . '].\n";
    }
    if(!nameRegex.test(lastName.value)) {
        errorMsg += "Last name is invalid.\n " + 
        "Ensure it only contains up to 25 alphabetical characters, " +
        "spaces and the following characters [- . '].\n";
    }
    if(!addressRegex.test(address.value)) {
        errorMsg += "Address is invalid.\n"; +
        "Ensure it only contains up to 75 alphanumeric characters, " +
        "spaces and the following characters [- . '].\n"
    }
    if(!cityRegex.test(city.value)) {
        errorMsg += "City is invalid.\n" +
        "Ensure it only contains up to 50 alphabetical characters," +
        "spaces and the following characters [- . or '].\n";   
    }
    if(!provRegex.test(province.value)) {
        errorMsg += "Province is invalid.\n" + 
        "Please select a valid province from the list.";
    }
    if(!postalRegex.test(postal.value)) {
        errorMsg += "Postal code is invalid.\n" +
        "Ensure it is in the format 'T0A0A0'.\n";
    }
    if(!countryRegex.test(country.value)) {
        errorMsg += "Country is invalid.\n" + 
        "Ensure it only contains up to 50 alphabetical characters," +
        "spaces and the folowing characters [' &].\n";
    }
    if(!phoneRegex.test(homePhone.value)) {
        errorMsg += "Home phone number is invalid.\n" +
        "Ensure it contains 10 numerical characters, " +
        "in the format 4031234567.\n";
    }
    if(!phoneRegex.test(busPhone.value)) {
        errorMsg += "Business phone number is invalid. " +
        "Ensure it contains 10 numerical characters, " +
        "in the format 4031234567.\n";
    }
    if(!emailRegex.test(email.value)) {
        errorMsg += "Email is invalid.\n" + 
        "Ensure it contains up to 50 alphanumeric characters, " +
        "in the format myemail@example.com.\n";
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