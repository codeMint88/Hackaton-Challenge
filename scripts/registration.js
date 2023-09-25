// Submit Registration Form
// Submit Registration Form
// Submit Registration Form
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector("button[type='submit']"); // Select the submit button

    const originalButtonText = submitButton.textContent; // Store the original button text

    console.log(form);
    // Change the button text to "In progress..."
    submitButton.textContent = "In progress...";

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

        // Revert the button text to the original text
        submitButton.textContent = originalButtonText;
        successPage.classList.remove("hidden");
        overlay.classList.remove("hidden");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
