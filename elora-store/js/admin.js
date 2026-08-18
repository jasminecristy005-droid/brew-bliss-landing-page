document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

});


function getOrder() {

    const savedOrder =
        localStorage.getItem("eloraLastOrder");

    if (!savedOrder) {
        return null;
    }

    try {
        return JSON.parse(savedOrder);
    } catch (error) {
        console.error("Order data error:", error);
        return null;
    }

}


function loadDashboard() {

    const order = getOrder();

    const orders = order ? [order] : [];

    updateStats(orders);

    renderOrders(orders);

}


function updateStats(orders) {

    const totalOrders =
        document.getElementById("totalOrders");

    const newOrders =
        document.getElementById("newOrders");

    const processingOrders =
        document.getElementById("processingOrders");

    const totalRevenue =
        document.getElementById("totalRevenue");


    const newCount =
        orders.filter(
            order => order.status === "New Order"
        ).length;


    const processingCount =
        orders.filter(
            order => order.status === "Processing"
        ).length;


    const revenue =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );


    totalOrders.textContent =
        orders.length;

    newOrders.textContent =
        newCount;

    processingOrders.textContent =
        processingCount;

    totalRevenue.textContent =
        `$${revenue.toFixed(2)}`;

}


function renderOrders(orders) {

    const tableBody =
        document.getElementById("ordersTableBody");


    if (!orders.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No orders yet.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML = orders.map(order => `

        <tr>

            <td>
                <strong>
                    ${order.orderId}
                </strong>
            </td>

            <td>
                ${order.customer.fullName}
            </td>

            <td>
                $${Number(order.total).toFixed(2)}
            </td>

            <td>
                ${order.customer.paymentMethod}
            </td>

            <td>

                <select
                    class="admin-status-select"
                    data-order-id="${order.orderId}"
                >

                    <option value="New Order"
                        ${order.status === "New Order" ? "selected" : ""}>
                        New Order
                    </option>

                    <option value="Processing"
                        ${order.status === "Processing" ? "selected" : ""}>
                        Processing
                    </option>

                    <option value="Ready"
                        ${order.status === "Ready" ? "selected" : ""}>
                        Ready
                    </option>

                    <option value="Completed"
                        ${order.status === "Completed" ? "selected" : ""}>
                        Completed
                    </option>

                </select>

            </td>

            <td>

                <button
                    type="button"
                    class="view-order-button"
                >
                    View
                </button>

            </td>

        </tr>

    `).join("");


    document
        .querySelectorAll(".admin-status-select")
        .forEach(select => {

            select.addEventListener("change", function () {

                const orderId =
                    this.dataset.orderId;

                const newStatus =
                    this.value;

                console.log(
                    "STATUS CHANGE:",
                    orderId,
                    newStatus
                );

                saveOrderStatus(
                    orderId,
                    newStatus
                );

            });

        });

}


function saveOrderStatus(
    orderId,
    newStatus
) {

    const order = getOrder();


    if (!order) {

        console.error("No order found.");

        return;
    }


    if (order.orderId !== orderId) {

        console.error(
            "Order ID mismatch:",
            order.orderId,
            orderId
        );

        return;
    }


    order.status =
        newStatus;


    localStorage.setItem(
        "eloraLastOrder",
        JSON.stringify(order)
    );


    console.log(
        "ORDER SAVED:",
        order
    );


    loadDashboard();

}