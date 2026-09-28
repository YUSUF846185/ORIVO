document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTS
    // =========================================

    const ordersList =
        document.getElementById("ordersList");

    const ordersCount =
        document.getElementById("ordersCount");

    const clearOrdersButton =
        document.getElementById("clearOrdersButton");

    const searchInput =
        document.getElementById("orderSearch");

    const cartCount =
        document.getElementById("cartCount");

    const wishlistCount =
        document.getElementById("wishlistCount");

    const themeButton =
        document.getElementById("themeButton");


    // =========================================
    // LOCAL STORAGE
    // =========================================

    let orders =
        JSON.parse(
            localStorage.getItem("orivoOrders")
        ) || [];

    let cart =
        JSON.parse(
            localStorage.getItem("orivoCart")
        ) || [];

    let wishlist =
        JSON.parse(
            localStorage.getItem("orivoWishlist")
        ) || [];


    // =========================================
    // FORMAT PRICE
    // =========================================

    function formatPrice(price) {

        return Number(price || 0)
            .toLocaleString("ru-RU");

    }


    // =========================================
    // UPDATE HEADER COUNTS
    // =========================================

    function updateCounts() {

        let totalCart = 0;

        cart.forEach(function (item) {

            totalCart += Number(
                item.quantity || 1
            );

        });


        if (cartCount) {

            cartCount.textContent =
                totalCart;

        }


        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }

    }


    // =========================================
    // FORMAT DATE
    // =========================================

    function formatDate(date) {

        if (!date) {

            return "Сана номаълум";

        }


        const currentDate =
            new Date(date);


        if (
            Number.isNaN(
                currentDate.getTime()
            )
        ) {

            return "Сана номаълум";

        }


        return currentDate.toLocaleDateString(
            "tg-TJ",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        )
        +
        " • "
        +
        currentDate.toLocaleTimeString(
            "tg-TJ",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    // =========================================
    // PAYMENT NAME
    // =========================================

    function getPaymentName(payment) {

        if (payment === "card") {

            return "💳 Корти бонкӣ";

        }


        if (payment === "online") {

            return "🌐 Пардохти онлайн";

        }


        return "💵 Пардохт ҳангоми гирифтани мол";

    }


    // =========================================
    // SECURITY
    // =========================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    // =========================================
    // EMPTY PAGE
    // =========================================

    function showEmpty(message) {

        ordersList.innerHTML = `

            <div class="orders-empty">

                <div class="orders-empty-icon">
                    🧾
                </div>

                <h2>
                    ${message}
                </h2>

                <p>
                    Ҳоло ягон фармоиш
                    нишон дода намешавад.
                </p>

                <a
                    href="index.html"
                    class="shop-button"
                >

                    🛍 Ба Marketplace

                </a>

            </div>

        `;

    }


    // =========================================
    // CREATE PRODUCT HTML
    // =========================================

    function createProductHTML(item) {

        const name =
            item.name || "Маҳсулот";

        const quantity =
            Number(item.quantity || 1);

        const price =
            Number(item.price || 0);

        const total =
            price * quantity;


        const image =
            item.image
                ? `images/${item.image}`
                : "images/orivo-logo.png";


        return `

            <div class="order-product">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    onerror="
                        this.src='images/orivo-logo.png'
                    "
                >


                <div class="order-product-info">

                    <h4>
                        ${escapeHTML(name)}
                    </h4>

                    <p>

                        ${formatPrice(price)}
                        сомонӣ ×
                        ${quantity}

                    </p>

                </div>


                <div class="order-product-price">

                    ${formatPrice(total)}
                    сомонӣ

                </div>

            </div>

        `;

    }


    // =========================================
    // CREATE ORDER HTML
    // =========================================

    function createOrderHTML(order) {

        const customer =
            order.customer || {};


        const items =
            Array.isArray(order.items)
                ? order.items
                : [];


        let productsHTML = "";


        items.forEach(function (item) {

            productsHTML +=
                createProductHTML(item);

        });


        if (!productsHTML) {

            productsHTML = `

                <p>
                    Маҳсулот нест.
                </p>

            `;

        }


        const orderId =
            order.id ||
            "ORIVO-ORDER";


        const total =
            Number(order.total || 0);


        return `

            <article
                class="order-card"
                data-order-id="${escapeHTML(orderId)}"
            >


                <!-- HEADER -->

                <div class="order-header">

                    <div>

                        <div class="order-number">

                            🧾
                            ${escapeHTML(orderId)}

                        </div>


                        <div class="order-date">

                            📅
                            ${formatDate(order.date)}

                        </div>

                    </div>


                    <div class="order-status">

                        🟢 Қабул шуд

                    </div>

                </div>



                <!-- CUSTOMER -->

                <div class="order-customer">


                    <div class="customer-box">

                        <small>
                            👤 Харидор
                        </small>

                        <strong>

                            ${escapeHTML(
                                customer.name || "—"
                            )}

                        </strong>

                    </div>


                    <div class="customer-box">

                        <small>
                            📞 Телефон
                        </small>

                        <strong>

                            ${escapeHTML(
                                customer.phone || "—"
                            )}

                        </strong>

                    </div>


                    <div class="customer-box">

                        <small>
                            🏙 Шаҳр
                        </small>

                        <strong>

                            ${escapeHTML(
                                customer.city || "—"
                            )}

                        </strong>

                    </div>


                    <div class="customer-box">

                        <small>
                            📍 Суроға
                        </small>

                        <strong>

                            ${escapeHTML(
                                customer.address || "—"
                            )}

                        </strong>

                    </div>


                    ${
                        customer.comment
                            ? `

                                <div class="customer-box">

                                    <small>
                                        📝 Шарҳ
                                    </small>

                                    <strong>

                                        ${escapeHTML(
                                            customer.comment
                                        )}

                                    </strong>

                                </div>

                            `
                            : ""
                    }

                </div>



                <!-- PRODUCTS -->

                <div class="order-products-title">

                    📦 Маҳсулотҳо

                </div>


                <div class="order-products">

                    ${productsHTML}

                </div>



                <!-- FOOTER -->

                <div class="order-footer">


                    <div class="payment-method">

                        Пардохт:

                        <strong>

                            ${getPaymentName(
                                order.payment
                            )}

                        </strong>

                    </div>


                    <div class="order-total">

                        <span>
                            Ҳамагӣ
                        </span>

                        <strong>

                            ${formatPrice(total)}
                            сомонӣ

                        </strong>

                    </div>

                </div>



                <!-- DELETE -->

                <button
                    type="button"
                    class="delete-order-button"
                    data-id="${escapeHTML(orderId)}"
                >

                    🗑️ Нест кардани ин фармоиш

                </button>


            </article>

        `;

    }


    // =========================================
    // RENDER ORDERS
    // =========================================

    function renderOrders(searchText = "") {

        if (!ordersList) {

            return;

        }


        ordersList.innerHTML = "";


        if (orders.length === 0) {

            showEmpty(
                "Ҳоло фармоиш нест"
            );

            if (ordersCount) {

                ordersCount.textContent =
                    "Фармоишҳо: 0";

            }

            return;

        }


        const query =
            String(searchText)
                .toLowerCase()
                .trim();


        const filteredOrders =
            orders.filter(function (order) {

                const id =
                    String(
                        order.id || ""
                    ).toLowerCase();


                const name =
                    String(
                        order.customer?.name || ""
                    ).toLowerCase();


                const phone =
                    String(
                        order.customer?.phone || ""
                    ).toLowerCase();


                const city =
                    String(
                        order.customer?.city || ""
                    ).toLowerCase();


                return (
                    id.includes(query) ||
                    name.includes(query) ||
                    phone.includes(query) ||
                    city.includes(query)
                );

            });


        if (ordersCount) {

            ordersCount.textContent =
                "Фармоишҳо: " +
                filteredOrders.length;

        }


        if (
            filteredOrders.length === 0
        ) {

            showEmpty(
                "Фармоиш ёфт нашуд"
            );

            return;

        }


        filteredOrders.forEach(
            function (order) {

                ordersList.insertAdjacentHTML(
                    "beforeend",
                    createOrderHTML(order)
                );

            }
        );


        attachDeleteButtons();

    }


    // =========================================
    // DELETE ONE ORDER
    // =========================================

    function attachDeleteButtons() {

        const buttons =
            document.querySelectorAll(
                ".delete-order-button"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        this.dataset.id;


                    const confirmed =
                        confirm(
                            "Оё мехоҳед ин фармоишро нест кунед?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    orders =
                        orders.filter(
                            function (order) {

                                return String(
                                    order.id
                                ) !== String(id);

                            }
                        );


                    localStorage.setItem(
                        "orivoOrders",
                        JSON.stringify(orders)
                    );


                    renderOrders(
                        searchInput
                            ? searchInput.value
                            : ""
                    );

                }
            );

        });

    }


    // =========================================
    // DELETE ALL ORDERS
    // =========================================

    if (clearOrdersButton) {

        clearOrdersButton.addEventListener(
            "click",
            function () {

                if (orders.length === 0) {

                    alert(
                        "🧾 Ҳоло ягон фармоиш нест."
                    );

                    return;

                }


                const confirmed =
                    confirm(
                        "Оё мутмаин ҳастед, ки ҳамаи фармоишҳоро нест мекунед?"
                    );


                if (!confirmed) {

                    return;

                }


                orders = [];


                localStorage.removeItem(
                    "orivoOrders"
                );


                renderOrders();

            }
        );

    }


    // =========================================
    // SEARCH
    // =========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                renderOrders(
                    this.value
                );

            }
        );

    }


    // =========================================
    // DARK MODE
    // =========================================

    function loadTheme() {

        const savedTheme =
            localStorage.getItem(
                "orivoTheme"
            );


        if (
            savedTheme === "dark"
        ) {

            document.body.classList.add(
                "dark-mode"
            );


            if (themeButton) {

                themeButton.textContent =
                    "☀️";

            }

        } else {

            document.body.classList.remove(
                "dark-mode"
            );


            if (themeButton) {

                themeButton.textContent =
                    "🌙";

            }

        }

    }


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                if (isDark) {

                    localStorage.setItem(
                        "orivoTheme",
                        "dark"
                    );

                    this.textContent =
                        "☀️";

                } else {

                    localStorage.setItem(
                        "orivoTheme",
                        "light"
                    );

                    this.textContent =
                        "🌙";

                }

            }
        );

    }


    // =========================================
    // START
    // =========================================

    loadTheme();

    updateCounts();

    renderOrders();

});