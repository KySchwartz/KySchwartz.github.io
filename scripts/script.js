/*
    Student Name: Kyle Schwartz
    File Name: script.js
    Date: 9/2/2024
*/

//Global variables

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
}

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

// Truncates HTML safely without breaking/leaving unclosed tags
function truncateHTML(html, limit) {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    let charCount = 0;
    let truncated = false;

    function walk(node) {
        if (truncated) return;

        if (node.nodeType === Node.TEXT_NODE) {
            if (charCount + node.nodeValue.length > limit) {
                const remaining = limit - charCount;
                node.nodeValue = node.nodeValue.substring(0, remaining);
                truncated = true;
            } else {
                charCount += node.nodeValue.length;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (let i = 0; i < node.childNodes.length; i++) {
                walk(node.childNodes[i]);
                if (truncated) {
                    // Remove any sibling nodes that come after the truncation point
                    while (node.childNodes.length > i + 1) {
                        node.removeChild(node.lastChild);
                    }
                    break;
                }
            }
        }
    }

    walk(temp);
    return temp.innerHTML;
}

let allProjects = [];

// Helper function to build tile HTML strings
function createTileHTML(p) {
    const charLimit = 1000; // Character limit before truncating
    const description = p.description || '';

    const textOnlyLength = description.replace(/<[^>]+>/g, '').length;
    
    let descriptionHTML = '';

    if (textOnlyLength > charLimit) {
        const shortText = truncateHTML(description, charLimit);
        const fullText = description;

        descriptionHTML = `
            <div class="description-container">
                <span class="desc-short">
                    ${shortText}... 
                    <span class="toggle-desc-text" onclick="toggleDescription(this, true)">see more</span>
                </span>
                <span class="desc-full" style="display: none;">
                    ${fullText} 
                    <span class="toggle-desc-text" onclick="toggleDescription(this, false)">see less</span>
                </span>
            </div>
        `;
    } else {
        descriptionHTML = `<p>${description}</p>`;
    }

    return `
        <div class="tile">
            ${p.image ? `<img src="${p.image}" alt="${p.title}" class="zoomable-img">` : ''}
            <div class="tile-info">
                <h2>${p.title || ''}</h2>
                <h3>${p.date || ''}</h3>
                
                ${p.technologies && p.technologies.length > 0 ? `
                    <div class="tech-stack">
                        ${p.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                ` : ''}

                ${descriptionHTML}

                ${p.buttons && p.buttons.length > 0 ? `
                    <div class="tile-btn-container">
                        ${p.buttons.map(b => `<a href="${b.url}" class="tile-btn" target="_blank">${b.text}</a>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Toggle function for inline see more / see less
function toggleDescription(element, expand) {
    const container = element.closest('.description-container');
    const shortSpan = container.querySelector('.desc-short');
    const fullSpan = container.querySelector('.desc-full');

    if (expand) {
        shortSpan.style.display = 'none';
        fullSpan.style.display = 'inline';
    } else {
        shortSpan.style.display = 'inline';
        fullSpan.style.display = 'none';
    }
}

// RESTORED FUNCTION: Used by index.html to render featured projects
function loadProjects(containerId, featuredOnly = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const list = featuredOnly 
                ? projects.filter(p => p.category === 'featured' || p.featured === true) 
                : projects;

            container.innerHTML = list.map(createTileHTML).join('');
        })
        .catch(err => console.error('Error loading projects:', err));
}

// FUNCTION: Used on projects.html for 3-category layout & live search
function loadAndRenderProjectsPage() {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            allProjects = projects;
            renderProjectsPage(allProjects);
        })
        .catch(err => console.error('Error loading projects on projects.html:', err));
}

// Live search handler
function handleSearch() {
    const searchInput = document.getElementById('project-search');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = allProjects.filter(p => {
        const titleMatch = p.title ? p.title.toLowerCase().includes(query) : false;
        const dateMatch = p.date ? p.date.toLowerCase().includes(query) : false;
        const descMatch = p.description ? p.description.toLowerCase().includes(query) : false;
        const techMatch = p.technologies ? p.technologies.some(t => t.toLowerCase().includes(query)) : false;

        return titleMatch || dateMatch || descMatch || techMatch;
    });

    renderProjectsPage(filtered);
}

// Render helper for projects.html
function renderProjectsPage(projectsList) {
    const featuredContainer = document.getElementById('featured-projects-container');
    const majorContainer = document.getElementById('major-projects-container');
    const otherContainer = document.getElementById('other-projects-container');

    const featuredSection = document.getElementById('featured-section');
    const majorSection = document.getElementById('major-section');
    const otherSection = document.getElementById('other-section');
    const noResultsMsg = document.getElementById('no-results');

    if (!featuredContainer || !majorContainer || !otherContainer) return;

    // Filter projects into categories with backward-compatibility fallbacks
    const featuredList = projectsList.filter(p => p.category === 'featured' || p.featured === true);
    const majorList = projectsList.filter(p => p.category === 'major');
    const otherList = projectsList.filter(p => 
        p.category === 'other' || 
        (!p.category && !p.featured)
    );

    // Show/hide sections dynamically
    if (featuredSection) featuredSection.style.display = featuredList.length > 0 ? 'block' : 'none';
    if (majorSection) majorSection.style.display = majorList.length > 0 ? 'block' : 'none';
    if (otherSection) otherSection.style.display = otherList.length > 0 ? 'block' : 'none';

    if (noResultsMsg) noResultsMsg.style.display = (projectsList.length === 0) ? 'block' : 'none';

    // Inject generated HTML
    featuredContainer.innerHTML = featuredList.map(createTileHTML).join('');
    majorContainer.innerHTML = majorList.map(createTileHTML).join('');
    otherContainer.innerHTML = otherList.map(createTileHTML).join('');
}

// Function to fetch projects and render them into containers dynamically
/*function loadProjects(containerId, featuredOnly = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const list = featuredOnly ? projects.filter(p => p.featured) : projects;

            container.innerHTML = list.map(p => `
                <div class="tile">
                    ${p.image ? `<img src="${p.image}" alt="${p.title}" class="zoomable-img">` : ''}
                    <div class="tile-info">
                        <h2>${p.title}</h2>
                        <h3>${p.date}</h3>
                        
                        ${p.technologies && p.technologies.length > 0 ? `
                            <div class="tech-stack">
                                ${p.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        ` : ''}

                        <p>${p.description}</p>

                        ${p.buttons && p.buttons.length > 0 ? `
                            <div class="tile-btn-container">
                                ${p.buttons.map(b => `<a href="${b.url}" class="tile-btn" target="_blank">${b.text}</a>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        })
        .catch(err => console.error('Error loading projects:', err));
}*/

// Makes a modal appear for images with the .zoomable-img class
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal) return;

    // Attach click event listener to all images with class 'zoomable-img'
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('zoomable-img')) {
          modal.style.display = 'block';
          modalImg.src = e.target.src;
          captionText.innerHTML = e.target.alt;
        }
      });
    // Close modal when clicking the 'X' button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking anywhere outside the enlarged image
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) {
            modal.style.display = 'none';
        }
    });

    // Close modal when pressing the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});


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
