const form = document.getElementById("coffee-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    message.textContent = "Submitting...";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            window.location.href = "thankyou.html";
        } else {
            message.textContent = "Something went wrong. Please try again.";
        }

    } catch (error) {
        message.textContent = "Unable to submit the form. Please try again.";
    }
});
