const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

//Update url and image count after initial load
const updateAPIURLWithNewCount = (count) => {
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
};

//Chedck if images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

//Helper for set attributes
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    attributes[key] === null
      ? null
      : element.setAttribute(key, attributes[key]);
  }
};

//Create Elements For Links and Photos, add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //create anchor to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Create image for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      title: photo.description,
      alt: photo.description,
    });

    //Event to check for finished loading
    img.addEventListener("load", imageLoaded);

    //Put image inside anchor, then put both to image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Unsplash API
let count = 5;
const apiKey = "64hXMwMJtx6JEZ6lVp9GuDgqMc5eiff0DFwhfLlP9D0";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get Photos from Unsplash
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {}
};

//Check to see if scrolling is near bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//On Load
getPhotos();
