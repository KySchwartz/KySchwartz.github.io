/*
    Student Name: Kyle Schwartz
    File Name: script.js
    Date: 9/2/2024
*/

//Global variables


//Hamburger menu function
function hamburger() {
    var menu = document.getElementById("menu-links");
    var logo = document.getElementById("schwartzee-logo");
    var header = document.getElementById("news-header");
    var icon = document.querySelector(".menu-icon");
    if (menu.style.display === "block" && logo.style.display === "none") {
        menu.style.display = "none";
        //menu.classList.add('animated');
        logo.style.display = "block";
        header.style.display = "block";
        icon.innerHTML = "&#9776";
        icon.style.top = "20px";
    } else {
        menu.style.display = "block";
        logo.style.display = "none";
        header.style.display = "none";
        icon.innerHTML = "X";
        icon.style.top = "0";
    }
}


// Function to drop single content button pairs using ids
function drop(dropDiv, arrow) {
  var x = document.getElementById(dropDiv);
    var ar = document.getElementById(arrow);
  if (x.style.display === "block") {
    x.style.display = "none";
      ar.style.transform = 'rotate(0deg)';
      x.style.opacity = 1;
  x.style.transform = 'translateY(0)';
  x.style.transition = 'all 0.5s ease';
  } else {
    x.style.display = "block";
      x.classList.add('animated');
      ar.style.transform = 'rotate(180deg)';
  }
}


// Dynamic function using DOM relationships to drop button and content pairs automatically
function dropTable(event) {
  const dropButton = event.target.closest('.drop-btn');
  const x = dropButton.nextElementSibling;
  const ar = dropButton.querySelector('.arrow'); // Find the child element with class "arrow"


 if (x.style.display === "block") {
   x.style.display = "none";
     ar.style.transform = 'rotate(0deg)';
     x.style.opacity = 1;
 x.style.transform = 'translateY(0)';
 x.style.transition = 'all 0.5s ease';
 } else {
   x.style.display = "block";
     x.classList.add('animated');
     ar.style.transform = 'rotate(180deg)';
 }
}


// Attach the event listener to a common parent element
document.querySelector('.drop-table').addEventListener('click', dropTable);


// Dynamic function using DOM relationships to print content to drop content tables automatically
function dateCalculator(dateString, element) {
  // Convert the input date string to a Date object
  const inputDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - inputDate;

  // Convert milliseconds to months
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.44);

  // Calculate years and remaining months
  const years = Math.floor(diffInMonths / 12);
  const months = Math.round(diffInMonths % 12);

  // Create the output string
  let output = "";
  if (years > 0) {
    output += `${years} year${years !== 1 ? "s" : ""} `;
  }
  if (months > 0) {
    output += `${months} month${months !== 1 ? "s" : ""}`;
  }

  // Update the innerHTML of the specified element
    const dropContent = element.nextElementSibling;
     const startDateElement = dropContent.querySelector('.start-date');
    const expElement = dropContent.querySelector('.experience');
     startDateElement.innerHTML = formatDateAsMonthYear(dateString);
     expElement.innerHTML = output || "Less than a month";
  
   // console.log(output);
}



// Function to calculate years and months since a given date and print to elements of a given id
function calculateYearsAndMonths(dateString, elementId, dateElementId) {
  // Convert the input date string to a Date object
  const inputDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - inputDate;

  // Convert milliseconds to months
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.44);

  // Calculate years and remaining months
  const years = Math.floor(diffInMonths / 12);
  const months = Math.round(diffInMonths % 12);

  // Create the output string
  let output = "";
  if (years > 0) {
    output += `${years} year${years !== 1 ? "s" : ""} `;
  }
  if (months > 0) {
    output += `${months} month${months !== 1 ? "s" : ""}`;
  }

  // Update the innerHTML of the specified element
  document.getElementById(elementId).innerHTML = output || "Less than a month";
    document.getElementById(dateElementId).innerHTML = formatDateAsMonthYear(dateString);
   // console.log(output);
}

// Function to format the outputted month and year from the calculate function
function formatDateAsMonthYear(date) {
  // Create a Date object if a string is passed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // Get the month as a number (0-11)
  const monthIndex = date.getMonth();

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get the year as a four-digit number
  const year = date.getFullYear();

  // Return the formatted string
  return `${monthNames[monthIndex]}, ${year}`;
}

// Depreceated function used for drop button content pairs using an array index argument
/*
function dropTable(index) {
    const dropContentElements = document.getElementsByClassName('drop-content');
    const dropArrowElements = document.getElementsByClassName('arrow');
  var x = dropContentElements[index];
    var ar = dropArrowElements[index];
  if (x.style.display === "block") {
    x.style.display = "none";
      ar.style.transform = 'rotate(0deg)';
      x.style.opacity = 1;
  x.style.transform = 'translateY(0)';
  x.style.transition = 'all 0.5s ease';
  } else {
    x.style.display = "block";
      x.classList.add('animated');
      ar.style.transform = 'rotate(180deg)';
  }
}
*/

// Depreceated function used to print dates using an array index argument
/*
function dateCalculator(dateString, index) {
  // Convert the input date string to a Date object
  const inputDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - inputDate;

  // Convert milliseconds to months
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.44);

  // Calculate years and remaining months
  const years = Math.floor(diffInMonths / 12);
  const months = Math.round(diffInMonths % 12);

  // Create the output string
  let output = "";
  if (years > 0) {
    output += `${years} year${years !== 1 ? "s" : ""} `;
  }
  if (months > 0) {
    output += `${months} month${months !== 1 ? "s" : ""}`;
  }

  // Update the innerHTML of the specified element
     const startDateElement = document.getElementsByClassName('start-date');
    const expElement = document.getElementsByClassName('experience');
     expElement[index].innerHTML = output || "Less than a month";;
     startDateElement[index].innerHTML = formatDateAsMonthYear(dateString);
  
   // console.log(output);
}
*/
