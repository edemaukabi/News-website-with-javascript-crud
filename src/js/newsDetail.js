const carousel = document.querySelector(".carousel");

let currentPage = 1;
let totalPages;
let limit = 10;
let pageSize;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const news_id = urlParams.get('id')

let requestURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}`;
let imageURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/images`;

const generateUI = (items) => {
    for (let item of items.imageData) {
    let carousalImg = document.createElement("img");
    carousalImg.src = item.image;
    carousel.appendChild(carousalImg);}
    slideFunc();
  };


const getNews = async () => {
  let response = await fetch(requestURL);
  let imageResponse = await fetch(imageURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  if (!imageResponse.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  let imageData = await imageResponse.json();
  let totalResults = {data, imageData}
  generateUI(totalResults);
};

const init = () => {
  getNews();
};

window.onload = () => {
  init();
  commentInit();
};

const slideFunc = () => {
// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"),
  
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 1,
  intervalId;

// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};
// Call autoSlide function on page load
autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalId);
  // Calculate the updated image index based on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slideshow
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);
};


