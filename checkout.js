document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTS
    // =========================================

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutForm =
        document.getElementById("checkoutForm");

    const placeOrderButton =
        document.getElementById("placeOrderButton");

    const checkoutContent =
        document.getElementById("checkoutContent");

    const orderSuccess =
        document.getElementById("orderSuccess");

    const summaryItems =
        document.getElementById("summaryItems");

    const summaryProducts =
        document.getElementById("summaryProducts");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const deliveryPrice =
        document.getElementById("deliveryPrice");

    const cartCount =
        document.getElementById("cartCount");

    const wishlistCount =
        document.getElementById("wishlistCount");

    const themeButton =
        document.getElementById("themeButton");


    // =========================================
    // LOCAL STORAGE
    // =========================================

    let cart =
        JSON.parse(
            localStorage.getItem("orivoCart")
        ) || [];

    let wishlist =
        JSON.parse(
            localStorage.getItem("orivoWishlist")
        ) || [];


    // =========================================
    // PRICE FORMAT
    // =========================================

    function formatPrice(price) {

        return Number(price).toLocaleString("ru-RU");

    }


    // =========================================
    // UPDATE COUNTS
    // =========================================

    function updateCounts() {

        let count = 0;

        cart.forEach(function (item) {

            count += Number(
                item.quantity || 1
            );

        });

        if (cartCount) {
            cartCount.textContent = count;
        }

        if (wishlistCount) {
            wishlistCount.textContent =
                wishlist.length;
        }

    }


    // =========================================
    // SAVE CART
    // =========================================

    function saveCart() {

        localStorage.setItem(
            "orivoCart",
            JSON.stringify(cart)
        );

    }


    // =========================================
    // RENDER CART
    // =========================================

    function renderCheckout() {

        if (!checkoutItems) {
            return;
        }

        checkoutItems.innerHTML = "";


        // Агар сабад холӣ бошад
        if (cart.length === 0) {

            checkoutItems.innerHTML = `

                <div class="checkout-empty">

                    <div class="checkout-empty-icon">
                        🛒
                    </div>

                    <h2>
                        Сабад холӣ аст
                    </h2>

                    <p>
                        Аввал маҳсулотро ба сабад
                        илова кунед.
                    </p>

                    <a
                        href="index.html"
                        class="checkout-shop-button"
                    >
                        🛍 Ба Marketplace
                    </a>

                </div>

            `;


            if (placeOrderButton) {
                placeOrderButton.disabled = true;
            }


            updateSummary();

            return;

        }


        if (placeOrderButton) {
            placeOrderButton.disabled = false;
        }


        // Маҳсулотҳоро нишон медиҳем
        cart.forEach(function (item, index) {

            const quantity =
                Number(item.quantity || 1);

            const price =
                Number(item.price || 0);

            const total =
                price * quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "checkout-item";


            itemElement.innerHTML = `

                <img
                    src="images/${item.image}"
                    alt="${item.name}"
                    onerror="
                        this.src='images/orivo-logo.png'
                    "
                >


                <div class="checkout-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${formatPrice(price)}
                        сомонӣ
                    </p>

                </div>


                <div class="checkout-quantity">

                    <button
                        type="button"
                        class="minus-button"
                        data-index="${index}"
                    >
                        −
                    </button>


                    <strong>
                        ${quantity}
                    </strong>


                    <button
                        type="button"
                        class="plus-button"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <strong class="checkout-item-total">

                    ${formatPrice(total)}
                    сомонӣ

                </strong>


                <button
                    type="button"
                    class="remove-checkout-item"
                    data-index="${index}"
                    title="Нест кардан"
                >
                    🗑️
                </button>

            `;


            checkoutItems.appendChild(
                itemElement
            );

        });


        attachButtons();

        updateSummary();

    }


    // =========================================
    // BUTTONS
    // =========================================

    function attachButtons() {


        // MINUS
        document
            .querySelectorAll(".minus-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (!cart[index]) {
                            return;
                        }


                        cart[index].quantity =
                            Number(
                                cart[index].quantity || 1
                            ) - 1;


                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }


                        saveCart();

                        renderCheckout();

                        updateCounts();

                    }
                );

            });


        // PLUS
        document
            .querySelectorAll(".plus-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (!cart[index]) {
                            return;
                        }


                        cart[index].quantity =
                            Number(
                                cart[index].quantity || 1
                            ) + 1;


                        saveCart();

                        renderCheckout();

                        updateCounts();

                    }
                );

            });


        // REMOVE
        document
            .querySelectorAll(
                ".remove-checkout-item"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (!cart[index]) {
                            return;
                        }


                        cart.splice(
                            index,
                            1
                        );


                        saveCart();

                        renderCheckout();

                        updateCounts();

                    }
                );

            });

    }


    // =========================================
    // UPDATE SUMMARY
    // =========================================

    function updateSummary() {

        let total = 0;

        let count = 0;


        cart.forEach(function (item) {

            const quantity =
                Number(item.quantity || 1);

            const price =
                Number(item.price || 0);


            count += quantity;

            total +=
                price * quantity;

        });


        // Расонидан
        let delivery = 0;


        if (
            total > 0 &&
            total < 500
        ) {

            delivery = 30;

        }


        const finalTotal =
            total + delivery;


        if (summaryItems) {

            summaryItems.textContent =
                count;

        }


        if (summaryProducts) {

            summaryProducts.textContent =
                formatPrice(total);

        }


        if (deliveryPrice) {

            if (delivery === 0) {

                deliveryPrice.textContent =
                    total > 0
                        ? "Ройгон"
                        : "0 сомонӣ";

            } else {

                deliveryPrice.textContent =
                    formatPrice(delivery) +
                    " сомонӣ";

            }

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatPrice(finalTotal);

        }

    }


    // =========================================
    // PLACE ORDER
    // =========================================

    if (placeOrderButton) {

        placeOrderButton.addEventListener(
            "click",
            function () {


                // Санҷиши сабад
                if (cart.length === 0) {

                    alert(
                        "🛒 Сабад холӣ аст!"
                    );

                    return;

                }


                // Санҷиши форма
                if (
                    checkoutForm &&
                    !checkoutForm.checkValidity()
                ) {

                    checkoutForm.reportValidity();

                    return;

                }


                // Маълумоти харидор
                const fullName =
                    document
                        .getElementById("fullName")
                        ?.value
                        .trim() || "";


                const phone =
                    document
                        .getElementById("phone")
                        ?.value
                        .trim() || "";


                const city =
                    document
                        .getElementById("city")
                        ?.value || "";


                const address =
                    document
                        .getElementById("address")
                        ?.value
                        .trim() || "";


                const comment =
                    document
                        .getElementById("comment")
                        ?.value
                        .trim() || "";


                const payment =
                    document.querySelector(
                        'input[name="payment"]:checked'
                    );


                // Ҳисоби маблағ
                let subtotal = 0;

                let itemCount = 0;


                cart.forEach(function (item) {

                    const quantity =
                        Number(
                            item.quantity || 1
                        );


                    subtotal +=
                        Number(item.price || 0) *
                        quantity;


                    itemCount += quantity;

                });


                const delivery =
                    subtotal > 0 &&
                    subtotal < 500
                        ? 30
                        : 0;


                const total =
                    subtotal + delivery;


                // =====================================
                // ORDER OBJECT
                // =====================================

                const order = {

                    id:
                        "ORIVO-" +
                        Date.now(),

                    customer: {

                        name:
                            fullName,

                        phone:
                            phone,

                        city:
                            city,

                        address:
                            address,

                        comment:
                            comment

                    },

                    payment:
                        payment
                            ? payment.value
                            : "cash",

                    items:
                        cart,

                    itemCount:
                        itemCount,

                    subtotal:
                        subtotal,

                    delivery:
                        delivery,

                    total:
                        total,

                    date:
                        new Date().toISOString()

                };


                // =====================================
                // SAVE ORDER
                // =====================================

                const orders =
                    window.OrivoStore
                        ? window.OrivoStore.getOrders()
                        : (JSON.parse(localStorage.getItem("orivoOrders") || "[]") || []);


                orders.unshift(order);


                if (window.OrivoStore) {
                    window.OrivoStore.setOrders(orders);
                } else {
                    localStorage.setItem("orivoOrders", JSON.stringify(orders));
                    localStorage.setItem("orders", JSON.stringify(orders));
                }


                // =====================================
                // CLEAR CART
                // =====================================

                cart = [];


                saveCart();

                updateCounts();


                // =====================================
                // SUCCESS
                // =====================================

                if (checkoutContent) {

                    checkoutContent.style.display =
                        "none";

                }


                if (orderSuccess) {

                    orderSuccess.style.display =
                        "block";

                }


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    // =========================================
    // DARK MODE
    // =========================================

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

                    this.textContent =
                        "☀️";


                    localStorage.setItem(
                        "orivoTheme",
                        "dark"
                    );

                } else {

                    this.textContent =
                        "🌙";


                    localStorage.setItem(
                        "orivoTheme",
                        "light"
                    );

                }

            }
        );

    }


    // =========================================
    // START
    // =========================================

    updateCounts();

    renderCheckout();

});