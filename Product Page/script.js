/** @format */

const API_KEY = "rWm8e-sgoIhwVWr4XhV3imbopxOY7aJdoI8ylvrfNj4";
const unsplashURL = `https://api.unsplash.com/photos/random?count=10&client_id=${API_KEY}`;

async function fetchUnsplashImages() {
  try {
    const response = await fetch(unsplashURL);
    const images = await response.json();
    // console.log(images);
    document.getElementById("main-image").src = images[0].urls.regular;
    const thumbnailContainer = document.getElementById("thumbnail-container");
    thumbnailContainer.innerHTML = "";
    images.forEach((image, index) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = image.urls.thumb;
      thumbnail.alt = `Thumbnail ${index + 1}`;
      thumbnail.classList.add("thumbnail");
      thumbnail.addEventListener("click", () => {
        document.getElementById("main-image").src = image.urls.regular;
      });

      thumbnailContainer.appendChild(thumbnail);
    });
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
  }
}

function scrollThumbnails(direction) {
  const thumbnailContainer = document.getElementById("thumbnail-container");
  const scrollAmount = 120;

  if (direction === "left") {
    if (thumbnailContainer.scrollLeft <= 0) {
      thumbnailContainer.scrollLeft = thumbnailContainer.scrollWidth;
    } else {
      thumbnailContainer.scrollLeft -= scrollAmount;
    }
  } else if (direction === "right") {
    if (
      thumbnailContainer.scrollLeft + thumbnailContainer.clientWidth >=
      thumbnailContainer.scrollWidth
    ) {
      thumbnailContainer.scrollLeft = 0;
    } else {
      thumbnailContainer.scrollLeft += scrollAmount;
    }
  }
}

function addToCart() {
  let quantity = document.getElementById("quantity").value;
  let confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.style.display = "block";
  confirmationMessage.textContent = `Product added to cart! Quantity: ${quantity}`;
  setTimeout(() => {
    confirmationMessage.style.display = "none";
  }, 3000);
}

window.onload = fetchUnsplashImages;
