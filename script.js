console.log("Brew & Bliss Loaded");

const coffeeForm = document.getElementById("coffee-form");
const coffeeMessage = document.getElementById("form-message");

if (coffeeForm) {
    coffeeForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (coffeeMessage) {
            coffeeMessage.textContent = "Submitting...";
        }

        try {
            const response = await fetch(coffeeForm.action, {
                method: "POST",
                body: new FormData(coffeeForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                window.location.href =
                    "https://jasminecristy005-droid.github.io/brew-bliss-landing-page/thankyou.html";
            } else {
                if (coffeeMessage) {
                    coffeeMessage.textContent =
                        "Something went wrong. Please try again.";
                }
            }
        } catch (error) {
            console.error(error);

            if (coffeeMessage) {
                coffeeMessage.textContent =
                    "Unable to submit the form. Please try again.";
            }
        }
    });
}


const orderForm = document.querySelector(
    'form[action="https://formspree.io/f/mljrjeyd"]'
);

if (orderForm) {
    orderForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const button = orderForm.querySelector(
            'button[type="submit"]'
        );

        if (button) {
            button.disabled = true;
            button.textContent = "Submitting...";
        }

        try {
            const response = await fetch(orderForm.action, {
                method: "POST",
                body: new FormData(orderForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                window.location.href =
                    "https://jasminecristy005-droid.github.io/brew-bliss-landing-page/thankyou.html";
            } else {
                if (button) {
                    button.disabled = false;
                    button.textContent = "Place My Order";
                }

                alert("Something went wrong. Please try again.");
            }

        } catch (error) {
            console.error(error);

            if (button) {
                button.disabled = false;
                button.textContent = "Place My Order";
            }

            alert("Unable to submit the order. Please try again.");
        }
    });
}
