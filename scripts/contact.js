// Submit Contact Form
// Submit Contact Form
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
