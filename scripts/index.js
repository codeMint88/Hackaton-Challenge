const navContainer = document.querySelector(".nav_container");
const logoContainer = navContainer.querySelector(".logo_container");
const menuIcon = navContainer.querySelector(".menu_icon");
const cancelIcon = navContainer.querySelector(".cancel_icon");
const navList = navContainer.querySelector(".nav_list");
const primaryBtn = navContainer.querySelector(".primary_btn");
const header = document.querySelector("header");

// Scroll to Btn
const scrollToFaq = document.querySelector(".scroll_to_faq");
const faqSection = document.querySelector(".faq_section");
const scrollToIntro = document.querySelector(".scroll_to_intro");
const introSection = document.querySelector(".introduction_section");
const scrollToTimeline = document.querySelector(".scroll_to_timeline");
const timelineSection = document.querySelector(".timeline_section");

// Select sections to animate
const sectionsToAnimate = document.querySelectorAll(".animate_section");

const imgTargets = document.querySelectorAll("img[data-src]");

//Success Section
const successPage = document.querySelector(".success_section");
const overlay = document.querySelector(".overlay");

// Select all btn element to animate on hover
const allBtn = document.querySelectorAll(".primary_btn");

const closeMenu = () => {
  navList.style.display = "none";
  primaryBtn.style.display = "none";
  cancelIcon.style.display = "none";
  logoContainer.style.display = "block";
  menuIcon.style.display = "block";
  navContainer.style.marginBottom = "0";
};

const showMenu = () => {
  navList.style.display = "block";
  primaryBtn.style.display = "block";
  cancelIcon.style.display = "block";
  logoContainer.style.display = "none";
  menuIcon.style.display = "none";
  navContainer.style.marginBottom = "9rem";
};

// Scroll to Function
const scrollIntoViews = (button, section) => {
  button.addEventListener("click", () => {
    section.scrollIntoView({ behavior: "smooth" });
  });
};

// Call a function immediately after the page is loaded
document.addEventListener("DOMContentLoaded", function () {});

// Close Menu Bar
cancelIcon.addEventListener("click", closeMenu);

// Show Menu Bar
menuIcon.addEventListener("click", showMenu);

// Call scroll into view function
scrollIntoViews(scrollToFaq, faqSection);
scrollIntoViews(scrollToIntro, introSection);
scrollIntoViews(scrollToTimeline, timelineSection);

// SECTION ANIMATION
// SECTION ANIMATION
// SECTION ANIMATION

const animateSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section_hidden");
  entry.target.querySelectorAll(".animated_text").forEach((text, index) => {
    text.style.transitionDelay = `${index * 0.2}s`;
    text.style.opacity = "1";
    text.style.transform = "translateY(0)";
  });
  observer.unobserve(entry.target);
};

const secionObserver = new IntersectionObserver(animateSection, {
  root: null,
  threshold: 0.2,
});

sectionsToAnimate.forEach((section) => {
  secionObserver.observe(section);
  section.classList.add("section_hidden");
});

// Lazy loading images
// Lazy loading images
// Lazy loading images

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy_img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Close navbar for small screens when a link is clicked
// Close navbar for small screens when a link is clicked
// Close navbar for small screens when a link is clicked

navContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest("a");
  // console.log(clicked);

  // Guard clause
  if (!clicked) return;
  window.innerWidth < 768 && closeMenu();
});

// IMPLEMENTING TIMER
// IMPLEMENTING TIMER
// IMPLEMENTING TIMER
const targetDate = new Date("2023-09-31T23:59:59").getTime();

// Update the countdown timer every second
const timerInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
  const currentDate = new Date().getTime();
  const timeLeft = targetDate - currentDate;

  if (timeLeft <= 0) {
    // If the target date has passed, display 00:00:00 and stop the timer
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    clearInterval(timerInterval);
  } else {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the countdown timer elements
    document.getElementById("hours").innerHTML = `${formatTime(
      hours
    )} <span>H</span>`;
    document.getElementById("minutes").innerHTML = `${formatTime(
      minutes
    )} <span>M</span>`;
    document.getElementById("seconds").innerHTML = `${formatTime(
      seconds
    )} <span>S</span>`;
  }
}

function formatTime(time) {
  // Add leading zeros to single-digit numbers (e.g., 1 -> 01)
  return time < 10 ? `0${time}` : `${time}`;
}

// Initial update to avoid delay in displaying the timer
updateCountdown();
