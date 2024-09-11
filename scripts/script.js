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
// This is done directly on the html page to avoid errors on other pages
//document.querySelector('.drop-table').addEventListener('click', dropTable);


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

// Function to display the code in a code window by reading it from a text file
// Due to security policies of javaScript this code when only run on a live server
function displayCode(sourceFile, codeOutputId) {
  fetch(sourceFile)
      .then(response => response.text())
      .then(code => {
          const codeBox = document.getElementById(codeOutputId);
          const codeOutput = codeBox.querySelector('pre')
          const copyButton = codeBox.querySelector('button');

          codeOutput.textContent = code;

          // Apply syntax highlighting using your preferred library
          // Example using highlight.js:
          hljs.highlightElement(codeOutput);

          copyButton.addEventListener('click', () => {
              const codeOutput = document.getElementById(codeOutputId);
              const range = document.createRange();
              range.selectNodeContents(codeOutput);
              const selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              document.execCommand('copy');
              selection.removeAllRanges();   

  });
      })
      .catch(error => {
          console.error('Error fetching code:', error);
      });
}

/*
EXAMPLE USAGE
const codeWindow1 = document.getElementById('code-output');
const codeWindow2 = document.getElementById('code-output-2');

displayCode('files/test.txt', codeWindow1.id);
displayCode('files/test.txt', codeWindow2.id);
*/



// Function to control slideshows
function carousel() {
const slidesContainer = document.querySelector('.carousel-slides');
const slides = slidesContainer.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const indicatorContainer = document.querySelector('.carousel-indicator');

let slideIndex = 0;

function showSlide(index) {
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  updateActiveDot(index);
}

prevButton.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides; // Handle circular navigation
  showSlide(slideIndex);
  updateActiveDot(slideIndex);
});

nextButton.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % totalSlides; // Handle circular navigation
  showSlide(slideIndex);
  updateActiveDot(slideIndex);
});

// Create indicator dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('indicator-dot');
  indicatorContainer.appendChild(dot);
}

// When slide changes, update the active dot
function updateActiveDot(index) {
  const dots = document.querySelectorAll('.indicator-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Set the click events for each navigation dot
const dots = document.querySelectorAll('.indicator-dot');
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    slideIndex = i;
    updateActiveDot(i);
  });
});

// Initial display
showSlide(slideIndex);
}



// Function to control accordian content tabs
const tabs = document.querySelectorAll('.tab');

const openTab = tab => {
	const content = tab.childNodes[3];
	const contentHeight = content.scrollHeight;
	content.style.height = contentHeight + 'px';
};

const closeOthersTabs = (tabs, openTab) => {
	tabs.forEach(tab => {
		if (tab !== openTab) {
			const content = tab.childNodes[3];
			content.style.height = 0;
		}
	});
};

const closeTab = (tabs, openTab) => {
	tabs.forEach(tab => {
		if (tab == openTab) {
			const content = tab.childNodes[3];
			content.style.height = 0;
		}
	});
};

tabs.forEach(tab => {
  tab.clickCount = 0;
  tab.addEventListener('click', () => {
    tab.clickCount++; // Increment click count
    if (tab.clickCount % 2 === 0) {
      // Even click (second or subsequent clicks)
      const content = tab.childNodes[3];
      content.style.height = 0; // Collapse content (simulate close)
    } else {
      // Odd click (first click)
      openTab(tab);
      closeOthersTabs(tabs, tab);
    }
  });
});

// Server function to display navbar on all pages that do not have one explicitly coded
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};



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
