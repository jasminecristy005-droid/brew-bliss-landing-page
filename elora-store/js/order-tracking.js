document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("trackingForm");
    const result = document.getElementById("trackingResult");

    if (!form || !result) return;


    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const enteredOrderId =
            document
                .getElementById("orderNumber")
                .value
                .trim()
                .toUpperCase();


        const savedOrder =
            JSON.parse(
                localStorage.getItem("eloraLastOrder")
            );


        console.log("TRACKING ORDER:", savedOrder);


        if (
            !savedOrder ||
            savedOrder.orderId !== enteredOrderId
        ) {

            result.innerHTML = `

                <div class="tracking-error">

                    <strong>
                        Order not found
                    </strong>

                    <p>
                        Please check your order number
                        and try again.
                    </p>

                </div>

            `;

            return;
        }


        result.innerHTML = `

            <div class="tracking-success">

                <p class="tracking-label">
                    ORDER FOUND
                </p>

                <h2>
                    ${savedOrder.orderId}
                </h2>


                <div class="tracking-info">

                    <div>
                        <span>Customer</span>

                        <strong>
                            ${savedOrder.customer.fullName}
                        </strong>
                    </div>


                    <div>
                        <span>Total</span>

                        <strong>
                            $${Number(savedOrder.total).toFixed(2)}
                        </strong>
                    </div>


                    <div>
                        <span>Payment</span>

                        <strong>
                            ${savedOrder.customer.paymentMethod}
                        </strong>
                    </div>


                    <div>
                        <span>Status</span>

                        <strong class="order-status">
                            ${savedOrder.status}
                        </strong>
                    </div>

                </div>


                <div class="order-progress">

                    <div class="progress-step ${
                        getStepClass(savedOrder.status, "New Order")
                    }">

                        <span>1</span>

                        <p>
                            New Order
                        </p>

                    </div>


                    <div class="progress-line"></div>


                    <div class="progress-step ${
                        getStepClass(savedOrder.status, "Processing")
                    }">

                        <span>2</span>

                        <p>
                            Processing
                        </p>

                    </div>


                    <div class="progress-line"></div>


                    <div class="progress-step ${
                        getStepClass(savedOrder.status, "Ready")
                    }">

                        <span>3</span>

                        <p>
                            Ready
                        </p>

                    </div>


                    <div class="progress-line"></div>


                    <div class="progress-step ${
                        getStepClass(savedOrder.status, "Completed")
                    }">

                        <span>4</span>

                        <p>
                            Completed
                        </p>

                    </div>

                </div>

            </div>

        `;

    });

});


function getStepClass(
    currentStatus,
    stepStatus
) {

    const steps = [
        "New Order",
        "Processing",
        "Ready",
        "Completed"
    ];


    const currentIndex =
        steps.indexOf(currentStatus);

    const stepIndex =
        steps.indexOf(stepStatus);


    if (stepIndex <= currentIndex) {
        return "active";
    }


    return "";

}