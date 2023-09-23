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

// Submit Contact Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://backend.getlinked.ai/hackathon/contact-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)), // Convert form data to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response JSON
    })
    .then((data) => {
      // Handle the response data here
      console.log(data);

      // Clear the form inputs on success
      form.reset();
    })
    .catch((error) => {
      // Handle any errors here
      console.error("Error:", error);
    });
});

// Submit Registration Form
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    formData.set("category", parseInt(formData.get("category")));

    fetch("https://backend.getlinked.ai/hackathon/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        successPage.classList.remove("hidden");
        overlay.classList.remove("hidden");
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
