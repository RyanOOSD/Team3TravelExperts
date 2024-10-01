// Create array with image file paths
const imgPath = [
  "./img/willemstad.jpg",
  "./img/london.jpg",
  "./img/tahiti.jpg",
  "./img/cancun.jpg",
  "./img/easter.jpg",
  "./img/stockholm.jpg",
];

// Create array with image descriptions
const imgDesc = [
  "Experience the vibrant sights of Curaçao's capital, rich with Dutch heritage!",
  "London, a city with a long and storied history!",
  "Take in the calm breezes on Tahiti's warm and sandy beaches!",
  "Enjoy some of Mexico's best beachside resorts in Cancún!",
  "See the mystifying sights first-hand on Easter Island!",
  "Sit back and relax while you enjoy a traditional Swedish sauna in Stockholm!"
];

// Create arrray with a link for each image
const imgLinks = [
  "https://www.curacao.com/en/",
  "https://www.visitlondon.com/",
  "https://www.tahiti.com/island/tahiti",
  "https://cancun.gob.mx/home",
  "https://www.chile.travel/en/where-to-go/macrozone/rapa-nui/",
  "https://www.visitstockholm.com/"
];

// Iterates through the imgPath array forr the length of the array 
for (let i = 0; i < imgPath.length; i++) {
  let path = imgPath[i];
  let desc = imgDesc[i];
  let link = imgLinks[i];
  // Modifies each element on the main page with a "card-i" ID
  // sets the image path to the value stored in the imgPath array
  document.getElementById("card-" + i)
    .setAttribute("style", `background-image: url(${path})`);
    // Add mouseover listeners for each image to display the description
    // Inserts the description into the corresponding p tag
    // For each image when moused over froom the value stored in the imgDesc array
    document.querySelector("#card-" + i)
      .addEventListener("mouseover", function() {
        document.getElementById("card-"+ i + "-desc").innerHTML=`${desc}`;
    });
    // Add an onclick listener for each image
    document.querySelector("#card-" + i)
      .addEventListener("click", function() {
        //When clicked a popup will be opened
        let popup = window.open("popup.html", "", "height=350, width=350");
        popup.document.open;
        popup.document.write("<h1>You will be redirected in 5 seconds.</h1>\n<br>");
        popup.document.write("<a href=" + `${link}` + ">Click here to go to the new page now.</a>\n<br>\n<br>");
        popup.document.write("<button id='cancel-link' type=button>Cancel</button>");
        popup.setTimeout("window.close()", 5000);
        setTimeout(function() {
          window.location.href = `${link}`;
        }, 5000);
    });
};

