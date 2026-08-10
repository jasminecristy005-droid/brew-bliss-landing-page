console.log("Brew & Bliss Loaded");


// ==========================================
// CLAIM MY FREE COFFEE FORM
// ==========================================

const coffeeForm = document.getElementById("coffee-form");
const coffeeMessage = document.getElementById("form-message");

if (coffeeForm) {

    coffeeForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (coffeeMessage) {
            coffeeMessage.textContent = "Submitting...";
        }

        const formData = new FormData(coffeeForm);

        try {

            const response = await fetch(coffeeForm.action, {
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


// ==========================================
// ORDER FORM
// ==========================================

const orderForm = document.querySelector(
    'form[action*="mljrjeyd"]'
);

if (orderForm) {

    orderForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const orderButton = orderForm.querySelector(
            'button[type="submit"]'
        );

        if (orderButton) {
            orderButton.disabled = true;
            orderButton.textContent = "Submitting...";
        }

        const formData = new FormData(orderForm);

        try {

            const response = await fetch(orderForm.action, {
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

                if (orderButton) {
                    orderButton.disabled = false;
                    orderButton.textContent = "Place My Order";
                }

                alert(
                    "Something went wrong. Please try again."
                );

            }

        } catch (error) {

            console.error(error);

            if (orderButton) {
                orderButton.disabled = false;
                orderButton.textContent = "Place My Order";
            }

            alert(
                "Unable to submit the order. Please check your internet connection and try again."
            );

        }

    });

}
