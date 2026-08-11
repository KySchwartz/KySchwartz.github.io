/*
    Student Name: Kyle Schwartz
    File Name: script.js
    Date: 10/4/2022
*/

//Global variables
var video = document.getElementById("example");
var videoSource = document.getElementById("vid-src");
var descriptionSource = document.getElementById("despsrc");

//Hamburger menu function
function hamburger() {
    var menu = document.getElementById("menu-links");
    var logo = document.getElementById("schwartzee-logo");
    if (menu.style.display === "block" && logo.style.display === "none") {
        menu.style.display = "none";
        logo.style.display = "block";
    } else {
        menu.style.display = "block";
        logo.style.display = "none";
    }
}

//Function to display the Purchase video
function purchase() {
    videoSource.src = "media/purchase.mp4";
    descriptionSource.src = "media/purchase-descriptions.vtt";
    video.style.display = "block";
    video.load();
}

//Function to display the Caring video
function caring() {
    videoSource.src = "media/purchase.mp4";
    descriptionSource.src = "media/purchase-descriptions.vtt";
    video.style.display = "block";
    video.load();
}

//Function to display the Splits video
function splits() {
    videoSource.src = "media/purchase.mp4";
    descriptionSource.src = "media/purchase-descriptions.vtt";
    video.style.display = "block";
    video.load();
}

//Function to display a promo code
function discount() {
    var promo = document.getElementById("special");
    promo.firstChild.nodeValue = "Promo Code: Bee22";
    promo.style.color = "#ff0000";
    promo.style.fontsize = "2em";
}