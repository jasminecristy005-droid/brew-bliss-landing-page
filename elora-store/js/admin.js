// =========================
// ÉLORA ADMIN DASHBOARD
// =========================

document.addEventListener("DOMContentLoaded", () => {

    checkAdminAndLoad();

});


// =========================
// CHECK ADMIN SESSION
// =========================

async function checkAdminAndLoad() {

    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession();


    if (!session) {

        window.location.href =
            "admin-login.html";

        return;
    }


    console.log(
        "ÉLORA ADMIN LOGGED IN:",
        session.user.email
    );


    loadDashboard();

subscribeToOrderChanges();

}


// =========================
// LOAD ORDERS FROM SUPABASE
// =========================

async function loadDashboard() {

    console.log(
        "ÉLORA: Loading orders from Supabase..."
    );


    const {
        data: orders,
        error
    } = await supabaseClient
        .from("elora_orders")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "ÉLORA Admin order error:",
            error
        );

        return;
    }


    console.log(
        "ÉLORA: Orders loaded:",
        orders
    );


    updateStats(orders);

    renderOrders(orders);

}


// =========================
// UPDATE STATISTICS
// =========================

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
            order =>
                order.status === "New Order"
        ).length;


    const processingCount =
        orders.filter(
            order =>
                order.status === "Processing"
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


// =========================
// RENDER ORDERS
// =========================

function renderOrders(orders) {

    const tableBody =
        document.getElementById(
            "ordersTableBody"
        );


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


    tableBody.innerHTML =
        orders.map(order => `

        <tr>

            <td>
                <strong>
                    ${order.order_id}
                </strong>
            </td>


            <td>
                ${order.customer_name}
            </td>


            <td>
                $${Number(order.total).toFixed(2)}
            </td>


            <td>
                ${order.payment_method || "-"}
            </td>


            <td>

                <select
                    class="admin-status-select"
                    data-order-id="${order.order_id}"
                >

                    <option value="New Order"
                        ${order.status === "New Order"
                            ? "selected"
                            : ""}>
                        New Order
                    </option>


                    <option value="Processing"
                        ${order.status === "Processing"
                            ? "selected"
                            : ""}>
                        Processing
                    </option>


                    <option value="Ready"
                        ${order.status === "Ready"
                            ? "selected"
                            : ""}>
                        Ready
                    </option>


                    <option value="Completed"
                        ${order.status === "Completed"
                            ? "selected"
                            : ""}>
                        Completed
                    </option>

                </select>

            </td>


            <td>

                <button
                    type="button"
                    class="view-order-button"
                    onclick="viewOrder('${order.order_id}')"
                >
                    View
                </button>

            </td>

        </tr>

    `).join("");


    document
        .querySelectorAll(
            ".admin-status-select"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                async function () {

                    const orderId =
                        this.dataset.orderId;

                    const newStatus =
                        this.value;


                    console.log(
                        "ÉLORA STATUS CHANGE:",
                        orderId,
                        newStatus
                    );


                    await updateOrderStatus(
                        orderId,
                        newStatus
                    );

                }
            );

        });

}


// =========================
// UPDATE ORDER STATUS
// =========================

async function updateOrderStatus(
    orderId,
    newStatus
) {

    const {
        error
    } = await supabaseClient
        .from("elora_orders")
        .update({
            status: newStatus
        })
        .eq(
            "order_id",
            orderId
        );


    if (error) {

        console.error(
            "ÉLORA status update error:",
            error
        );

        alert(
            "Unable to update order status."
        );

        return;
    }


    console.log(
        "ÉLORA ORDER STATUS UPDATED:",
        orderId,
        newStatus
    );


    loadDashboard();

}


// =========================
// VIEW ORDER
// =========================

function viewOrder(orderId) {

    console.log(
        "VIEW ORDER:",
        orderId
    );

    alert(
        "Order ID: " +
        orderId
    );

}
// =========================
// ÉLORA REALTIME ORDERS
// =========================

let realtimeStarted = false;

function subscribeToOrderChanges() {

    if (realtimeStarted) {

        console.log(
            "ÉLORA: Realtime already started."
        );

        return;
    }

    realtimeStarted = true;

    console.log(
        "ÉLORA: Starting realtime subscription..."
    );

    supabaseClient
        .channel("elora-admin-orders")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "elora_orders"
            },
            (payload) => {

                console.log(
                    "ÉLORA REALTIME EVENT:",
                    payload
                );

                loadDashboard();

            }
        )
        .subscribe((status) => {

            console.log(
                "ÉLORA REALTIME STATUS:",
                status
            );

        });

}