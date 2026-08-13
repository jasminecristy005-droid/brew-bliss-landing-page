console.log("Brew & Bliss Loaded");

const form = document.getElementById("coffee-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    message.textContent = "Submitting...";

    const formData = new FormData(form);

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            window.location.href =
    "https://jasminecristy005-droid.github.io/brew-bliss-landing-page/thankyou.html";

        } else {

            message.textContent =
                "Something went wrong. Please try again.";

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to submit the form. Please try again.";

    }

});