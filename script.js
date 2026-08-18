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

            // Get values from the order form
            const formData = new FormData(orderForm);

            const firstName = formData.get("first_name");
            const lastName = formData.get("last_name");
            const phone = formData.get("phone");
            const product = formData.get("product");
            const quantity = formData.get("quantity");
            const price = formData.get("price");
            const orderType = formData.get("order_type");


            // =========================
            // SAVE ORDER TO SUPABASE
            // =========================

            const { data, error } = await supabaseClient
                .from("orders")
                .insert([
                    {
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        product: product,
                        quantity: quantity,
                        price: price,
                        order_type: orderType
                    }
                ])
                .select()
                .single();


            if (error) {

                console.error(
                    "Supabase order error:",
                    error
                );

                alert(
                    "Unable to save your order. Please try again."
                );

                if (button) {
                    button.disabled = false;
                    button.textContent = "Place My Order";
                }

                return;
            }


            console.log(
                "Order saved to Supabase:",
                data
            );


            // =========================
            // ALSO SEND TO FORMSPREE
            // =========================

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

                console.warn(
                    "Formspree submission failed."
                );

                // Order is already saved in Supabase
                window.location.href =
                    "https://jasminecristy005-droid.github.io/brew-bliss-landing-page/thankyou.html";
            }


        } catch (error) {

            console.error(
                "Order submission error:",
                error
            );

            alert(
                "Unable to submit the order. Please try again."
            );

            if (button) {
                button.disabled = false;
                button.textContent = "Place My Order";
            }
        }
    });
}