let openMenu = document.querySelector(".icon-menu");
let menuLinks = document.querySelector(".nav-links");
let closeMenu = document.querySelector(".close-btn");

let cartBtn = document.getElementById("cart");
let cartDiv = document.getElementById("cart-hover");

let next = document.getElementById("next-main");
let prev = document.getElementById("prev-main");
let slides = document.querySelectorAll(".slide");

let incrementDecrementBtn = document.getElementById("increment-decrement-btn");
let decrementBtn = document.getElementById("decrement-btn");
let incrementBtn = document.getElementById("increment-btn");
let countNo = document.getElementById("count");
let shoescounterNo = document.getElementById("number-of-shoes");

let navCartBtn = document.getElementById("cart-btn");
let totalSum = document.getElementById("total");
let cartContent = document.getElementById("add-cart");
let cartCheckBtn = document.getElementById("cart-hover-btn");

let cartEmptyMassage = document.getElementById("cart-massage");

let cartDeleteBtn = document.getElementById("cart-delete-btn");

openMenu.addEventListener('click', function() {
    menuLinks.style.display = "block";
});
closeMenu.addEventListener('click', function() {
    menuLinks.style.display = "none";
});

let slideIndex = 0;

slides[slideIndex].classList.add("active");

function nextSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
    slides[slideIndex].classList.add('active');
}

function prevSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
    slides[slideIndex].classList.add('active');
}

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

let count = 0;
let shoescounter = 0;
let badgeCount = 0;  // Added badgeCount variable

// Function to update the cart menu
function showCartMenu() {
    if (count > 0) {
        cartEmptyMassage.style.display = "none";
        cartContent.style.display = "flex";
        cartCheckBtn.style.display = "block";
        totalSum.textContent = `Total: $${125 * shoescounter}`;
    } else {
        cartEmptyMassage.style.display = "block";
        cartContent.style.display = "none";
        cartCheckBtn.style.display = "none";
        totalSum.textContent = "Total: $0";
    }
}

// Function to update the badge count
function updateBadgeCount() {
    cartBtn.setAttribute("data-badge-content", badgeCount);
    if (badgeCount === 0) {
        cartBtn.classList.remove("show-badge");
    } else {
        cartBtn.classList.add("show-badge");
    }
}

// Store the cart data in localStorage
function saveCartData() {
    const cartData = {
        count: count,
        shoescounter: shoescounter,
        badgeCount: badgeCount  // Save badgeCount to localStorage
    };
    localStorage.setItem("cartData", JSON.stringify(cartData));
}

// Retrieve the cart data from localStorage
function loadCartData() {
    const savedCartData = localStorage.getItem("cartData");
    if (savedCartData) {
        const cartData = JSON.parse(savedCartData);
        count = cartData.count;
        shoescounter = cartData.shoescounter;
        badgeCount = cartData.badgeCount;  // Load badgeCount from localStorage
        countNo.textContent = count;
        shoescounterNo.textContent = shoescounter;
        showCartMenu();
        updateBadgeCount();  // Update badge count
    }
}

// Increment button click handler
incrementBtn.addEventListener('click', () => {
    count++;
    countNo.textContent = count;
    shoescounter = count;
    shoescounterNo.textContent = shoescounter;
    badgeCount = count;  // Update badge count with the new count 
    saveCartData();  // Save the updated cart data
});

navCartBtn.addEventListener('click', () => {
    showCartMenu();
    updateBadgeCount();
});

window.addEventListener('DOMContentLoaded', () => {
    loadCartData();  // Load the cart data when the page loads
});

cartDeleteBtn.addEventListener('click', () => {
    localStorage.removeItem("cartData");
    count = 0;
    shoescounter = 0;
    badgeCount = 0;  // Reset badge count
    countNo.textContent = count;
    shoescounterNo.textContent = shoescounter;
    showCartMenu();
    updateBadgeCount();  // Update badge count
});

// Decrement button click handler
decrementBtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        badgeCount = count;  // Update badge count
    }
    countNo.textContent = count;
    shoescounter = count;
    shoescounterNo.textContent = shoescounter;
    saveCartData();  // Save the updated cart data
});

cartBtn.addEventListener('click', () => {
    if (cartDiv.style.display === "block") {
        cartDiv.style.display = "none";
    } else {
        cartDiv.style.display = "block";
    }
});
document.addEventListener('DOMContentLoaded', () => {
  function initializeSlider(sliderId, thumbnailId) {
      let thumbnails = document.querySelectorAll(`#${thumbnailId} .thumb`);
      let slides = document.querySelectorAll(`#${sliderId} .slide`);

      // Add a condition to handle the class name difference between main-slider and lightbox-slider
      if (slides.length === 0) {
          slides = document.querySelectorAll(`#${sliderId} .slide2`);
      }

      let currentIndex = 0;

      thumbnails.forEach((thumb, index) => {
          thumb.addEventListener('click', () => {
              slides.forEach(slide => slide.classList.remove('active')); // Remove 'active' class from all slides
              slides[index].classList.add('active'); // Add 'active' class to the corresponding slide
              currentIndex = index;
          });
      });

      // Optional: add next and prev buttons functionality
      const prevBtn = document.getElementById(`prev-${sliderId.split('-')[0]}`);
      const nextBtn = document.getElementById(`next-${sliderId.split('-')[0]}`);

      if (prevBtn && nextBtn) {
          prevBtn.addEventListener('click', () => {
              slides[currentIndex].classList.remove('active');
              currentIndex = (currentIndex - 1 + slides.length) % slides.length;
              slides[currentIndex].classList.add('active');
          });

          nextBtn.addEventListener('click', () => {
              slides[currentIndex].classList.remove('active');
              currentIndex = (currentIndex + 1) % slides.length;
              slides[currentIndex].classList.add('active');
          });
      }
  }

  initializeSlider('main-slider', 'main-thumbnails');
  initializeSlider('lightbox-slider', 'lightbox-thumbnails');
});

let lightboxOverlay = document.querySelector('.lightbox-overlay');
let mainSlides = document.querySelectorAll('#main-slider .slide');

mainSlides.forEach((slide, index) => {
  slide.addEventListener('click', () => {
      let lightboxSlides = document.querySelectorAll('#lightbox-slider .slide2');
      lightboxSlides.forEach(lightboxSlide => lightboxSlide.classList.remove('active')); // Remove 'active' class from all slides

      let currentSlide = index; // Start with the clicked slide

      function showNextSlide() {
          lightboxSlides[currentSlide].classList.remove("active");
          currentSlide = (currentSlide === lightboxSlides.length - 1) ? 0 : currentSlide + 1;
          lightboxSlides[currentSlide].classList.add("active");
      }
 
      function showPrevSlide() {
          lightboxSlides[currentSlide].classList.remove("active"); 
          currentSlide = (currentSlide === 0) ? lightboxSlides.length - 1 : currentSlide - 1;
          lightboxSlides[currentSlide].classList.add("active");
      }

      const prevButton = document.getElementById('prev-lightbox');
      const nextButton = document.getElementById('next-lightbox');

      prevButton.removeEventListener('click', showPrevSlide);
      nextButton.removeEventListener('click', showNextSlide);

      prevButton.addEventListener('click', showPrevSlide);
      nextButton.addEventListener('click', showNextSlide);

      lightboxSlides[currentSlide].classList.add('active'); // Activate the clicked slide
      lightboxOverlay.style.display = 'flex';
  });
});

lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) {
      lightboxOverlay.style.display = 'none';
  }
});
