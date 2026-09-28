/* ==================================================
   ORIVO MARKETPLACE
   MAIN SCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       ELEMENTS
    ================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const cartCount =
        document.getElementById("cartCount");

    const wishlistCount =
        document.getElementById("wishlistCount");

    const cartItems =
        document.getElementById("cartItems");

    const totalPrice =
        document.getElementById("totalPrice");

    const checkoutButton =
        document.getElementById("checkoutButton");

    const startShoppingButton =
        document.getElementById("startShoppingButton");

    const themeButton =
        document.getElementById("themeButton");

    const newProducts =
        document.getElementById("newProducts");

    function setupAccountBar() {
        var area = document.getElementById("userArea");
        if (!area) {
            return;
        }
        var user = window.OrivoAuth && window.OrivoAuth.getSession
            ? window.OrivoAuth.getSession()
            : null;
        if (!user) {
            return;
        }
        var owner = window.OrivoAuth && window.OrivoAuth.isOwner && window.OrivoAuth.isOwner();
        area.innerHTML =
            '<a href="settings.html" class="header-link">' +
            (user.name || "Ҳисоб") +
            "</a>" +
            (owner
                ? '<a href="admin.html" class="header-link">Панел</a>'
                : "") +
            '<button type="button" class="header-link" id="orivoLogout">Баромад</button>';
        var out = document.getElementById("orivoLogout");
        if (out) {
            out.addEventListener("click", function () {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("adminLoggedIn");
                if (window.name && String(window.name).indexOf("ORIVOAUTH1:") === 0) {
                    window.name = "";
                }
                window.location.replace("login.html");
            });
        }
    }

    setupAccountBar();


    /* ==================================================
       STORAGE
    ================================================== */

    let cart =
        JSON.parse(
            localStorage.getItem("orivoCart")
        ) || [];


    let wishlist =
        JSON.parse(
            localStorage.getItem("orivoWishlist")
        ) || [];


    /* ==================================================
       SAVE STORAGE
    ================================================== */

    function saveCart() {

        localStorage.setItem(
            "orivoCart",
            JSON.stringify(cart)
        );

    }


    function saveWishlist() {

        localStorage.setItem(
            "orivoWishlist",
            JSON.stringify(wishlist)
        );

    }


    /* ==================================================
       FORMAT PRICE
    ================================================== */

    function formatPrice(price) {

        return Number(price).toLocaleString("ru-RU");

    }


    /* ==================================================
       CART COUNT
    ================================================== */

    function updateCartCount() {

        if (!cartCount) return;


        const count =
            cart.reduce(
                (sum, item) =>
                    sum + Number(item.quantity || 1),
                0
            );


        cartCount.textContent = count;

    }


    /* ==================================================
       WISHLIST COUNT
    ================================================== */

    function updateWishlistCount() {

        if (!wishlistCount) return;


        wishlistCount.textContent =
            wishlist.length;

    }


    /* ==================================================
       ADD TO CART
    ================================================== */

    function addToCart(product) {


        const existing =
            cart.find(
                item =>
                    item.name === product.name
            );


        if (existing) {

            existing.quantity =
                Number(existing.quantity || 1) + 1;

        } else {

            cart.push({

                name: product.name,

                price: Number(product.price),

                image: product.image,

                category: product.category,

                quantity: 1

            });

        }


        saveCart();

        updateCartCount();

        renderCart();


        showMessage(
            "🛒 Маҳсулот ба сабад илова шуд!"
        );

    }


    /* ==================================================
       REMOVE FROM CART
    ================================================== */

    function removeFromCart(index) {

        if (
            index < 0 ||
            index >= cart.length
        ) {
            return;
        }


        cart.splice(index, 1);


        saveCart();

        updateCartCount();

        renderCart();

    }


    /* ==================================================
       CHANGE QUANTITY
    ================================================== */

    function changeQuantity(index, amount) {


        if (
            !cart[index]
        ) {
            return;
        }


        cart[index].quantity =
            Number(cart[index].quantity || 1)
            + amount;


        if (
            cart[index].quantity <= 0
        ) {

            removeFromCart(index);

            return;

        }


        saveCart();

        updateCartCount();

        renderCart();

    }


    /* ==================================================
       RENDER CART
    ================================================== */

    function renderCart() {


        if (!cartItems) {
            return;
        }


        if (cart.length === 0) {


            cartItems.innerHTML = `

                <div class="empty-cart">

                    🛒

                    <h3>
                        Сабад холӣ аст
                    </h3>

                    <p>
                        Маҳсулотро ба сабад илова кунед.
                    </p>

                </div>

            `;


            if (totalPrice) {

                totalPrice.textContent = "0";

            }


            return;

        }


        let total = 0;


        cartItems.innerHTML = "";


        cart.forEach(
            (item, index) => {


                const quantity =
                    Number(item.quantity || 1);


                const itemTotal =
                    Number(item.price) *
                    quantity;


                total += itemTotal;


                const cartItem =
                    document.createElement("div");


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <div class="cart-product">

                        <img
                            src="images/${escapeHtml(item.image)}"
                            alt="${escapeHtml(item.name)}"
                            class="cart-thumb"
                        >

                        <div>

                            <h3>
                                ${escapeHtml(item.name)}
                            </h3>

                            <p>
                                ${formatPrice(item.price)}
                                сомонӣ
                            </p>

                        </div>

                    </div>


                    <div class="cart-controls">

                        <button
                            class="quantity-minus"
                            data-index="${index}"
                            type="button"
                        >
                            −
                        </button>


                        <strong>
                            ${quantity}
                        </strong>


                        <button
                            class="quantity-plus"
                            data-index="${index}"
                            type="button"
                        >
                            +
                        </button>


                        <button
                            class="remove-cart"
                            data-index="${index}"
                            type="button"
                        >
                            🗑️
                        </button>

                    </div>


                    <strong class="cart-item-total">

                        ${formatPrice(itemTotal)}
                        сомонӣ

                    </strong>

                `;


                cartItems.appendChild(
                    cartItem
                );

            }
        );


        if (totalPrice) {

            totalPrice.textContent =
                formatPrice(total);

        }


        attachCartButtons();

    }


    /* ==================================================
       CART BUTTONS
    ================================================== */

    function attachCartButtons() {


        document
            .querySelectorAll(".quantity-minus")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );

                        changeQuantity(
                            index,
                            -1
                        );

                    }
                );

            });


        document
            .querySelectorAll(".quantity-plus")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );

                        changeQuantity(
                            index,
                            1
                        );

                    }
                );

            });


        document
            .querySelectorAll(".remove-cart")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );

                        removeFromCart(
                            index
                        );

                    }
                );

            });

    }


    /* ==================================================
       ADD CART BUTTONS
    ================================================== */

    function attachProductButtons() {


        document
            .querySelectorAll(".add-cart-button")
            .forEach(button => {


                button.addEventListener(
                    "click",
                    function () {


                        const product = {

                            name:
                                this.dataset.name,

                            price:
                                Number(
                                    this.dataset.price
                                ),

                            image:
                                this.dataset.image,

                            category:
                                this.dataset.category

                        };


                        addToCart(product);

                    }
                );

            });

    }


    /* ==================================================
       WISHLIST
    ================================================== */

    function toggleWishlist(product) {


        const index =
            wishlist.findIndex(
                item =>
                    item.name === product.name
            );


        if (index !== -1) {


            wishlist.splice(
                index,
                1
            );


            showMessage(
                "💔 Аз Wishlist хориҷ шуд!"
            );


        } else {


            wishlist.push(product);


            showMessage(
                "❤️ Ба Wishlist илова шуд!"
            );

        }


        saveWishlist();

        updateWishlistCount();

        updateWishlistButtons();

    }


    /* ==================================================
       WISHLIST BUTTONS
    ================================================== */

    function attachWishlistButtons() {


        document
            .querySelectorAll(".wishlist-button")
            .forEach(button => {


                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();
                        event.preventDefault();

                        const product = {

                            name:
                                this.dataset.name,

                            price:
                                Number(
                                    this.dataset.price
                                ),

                            image:
                                this.dataset.image,

                            category:
                                this.dataset.category

                        };


                        toggleWishlist(
                            product
                        );

                    }
                );

            });

    }


    /* ==================================================
       UPDATE HEARTS
    ================================================== */

    function updateWishlistButtons() {


        document
            .querySelectorAll(".wishlist-button")
            .forEach(button => {


                const name =
                    button.dataset.name;


                const exists =
                    wishlist.some(
                        item =>
                            item.name === name
                    );


                if (exists) {

                    button.textContent =
                        "💖";

                } else {

                    button.textContent =
                        "❤️";

                }

            });

    }


    /* ==================================================
       LISTING FILTERS
    ================================================== */

    function applyListingFilters() {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const activeCategory =
            document.querySelector(".category.active");

        const category =
            activeCategory
                ? activeCategory.dataset.category
                : "all";

        const minInput = document.getElementById("minPrice");
        const maxInput = document.getElementById("maxPrice");
        const ratingFilter = document.getElementById("ratingFilter");
        const onlyDiscount = document.getElementById("onlyDiscount");

        const min = Number((minInput && minInput.value) || 0);
        const max = Number((maxInput && maxInput.value) || 0);
        const ratingMin = Number((ratingFilter && ratingFilter.value) || 0);
        const discountOnly = !!(onlyDiscount && onlyDiscount.checked);

        document.querySelectorAll(".product-card").forEach(function (product) {

            const name = (product.dataset.name || "").toLowerCase();
            const productCategory = (product.dataset.category || "").toLowerCase();
            const price = Number(
                (product.querySelector(".add-cart-button") || {}).dataset.price || 0
            );
            const ratingNode = product.querySelector(".rating span");
            const rating = ratingNode ? Number(ratingNode.textContent) : 5;
            const isSale = !!product.querySelector(".product-label.sale");

            const searchOk =
                !search ||
                name.includes(search) ||
                productCategory.includes(search);

            const categoryOk =
                category === "all" ||
                product.dataset.category === category;

            const minOk = !min || price >= min;
            const maxOk = !max || price <= max;
            const ratingOk = !ratingMin || rating >= ratingMin;
            const discountOk = !discountOnly || isSale;

            product.style.display =
                searchOk && categoryOk && minOk && maxOk && ratingOk && discountOk
                    ? ""
                    : "none";

        });

    }


    /* ==================================================
       SEARCH
    ================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyListingFilters
        );

        const searchSubmit = document.querySelector(".search-submit");

        if (searchSubmit) {
            searchSubmit.addEventListener("click", function () {
                applyListingFilters();
                const productsSection = document.getElementById("productsSection");
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        }

    }


    /* ==================================================
       CATEGORIES
    ================================================== */

    document
        .querySelectorAll(".category")
        .forEach(button => {


            button.addEventListener(
                "click",
                function () {


                    const category =
                        this.dataset.category;


                    document
                        .querySelectorAll(".category")
                        .forEach(
                            btn =>
                                btn.classList.remove(
                                    "active"
                                )
                        );


                    this.classList.add(
                        "active"
                    );


                    applyListingFilters();


                }
            );

        });


    /* ==================================================
       START SHOPPING
    ================================================== */

    if (startShoppingButton) {


        startShoppingButton.addEventListener(
            "click",
            function () {


                const productsSection =
                    document.getElementById(
                        "productsSection"
                    );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* ==================================================
       CHECKOUT
    ================================================== */

    if (checkoutButton) {


        checkoutButton.addEventListener(
            "click",
            function () {


                if (cart.length === 0) {

                    showMessage(
                        "🛒 Аввал маҳсулотро ба сабад илова кунед!"
                    );

                    return;

                }


                window.location.href =
                    "checkout.html";

            }
        );

    }


    /* ==================================================
       DARK MODE
    ================================================== */

    if (themeButton) {


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


            themeButton.textContent =
                "☀️";

        } else {


            themeButton.textContent =
                "🌙";

        }


        themeButton.addEventListener(
            "click",
            function () {


                document.body.classList.toggle(
                    "dark-mode"
                );


                const dark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                if (dark) {


                    themeButton.textContent =
                        "☀️";


                    localStorage.setItem(
                        "orivoTheme",
                        "dark"
                    );


                } else {


                    themeButton.textContent =
                        "🌙";


                    localStorage.setItem(
                        "orivoTheme",
                        "light"
                    );

                }

            }
        );

    }


    /* ==================================================
       MESSAGE
    ================================================== */

    function showMessage(message) {


        const oldMessage =
            document.querySelector(
                ".orivo-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const messageBox =
            document.createElement(
                "div"
            );


        messageBox.className =
            "orivo-message";


        messageBox.textContent =
            message;


        messageBox.style.position =
            "fixed";

        messageBox.style.right =
            "25px";

        messageBox.style.bottom =
            "25px";

        messageBox.style.zIndex =
            "9999";

        messageBox.style.padding =
            "14px 20px";

        messageBox.style.borderRadius =
            "14px";

        messageBox.style.background =
            "#08764d";

        messageBox.style.color =
            "white";

        messageBox.style.fontWeight =
            "700";

        messageBox.style.fontSize =
            "14px";

        messageBox.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.18)";


        document.body.appendChild(
            messageBox
        );


        setTimeout(
            function () {

                messageBox.remove();

            },
            2200
        );

    }


    /* ==================================================
       SECURITY / TEXT
    ================================================== */

    function escapeHtml(text) {


        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            text ?? "";


        return div.innerHTML;

    }


    /* ==================================================
       ADMIN PRODUCTS
    ================================================== */

    function loadAdminProducts() {


        if (!newProducts) {
            return;
        }


        const adminProducts =
            window.OrivoStore
                ? window.OrivoStore.getExtraProducts()
                : (JSON.parse(localStorage.getItem("orivoAdminProducts") || "[]") || []);


        if (
            adminProducts.length === 0
        ) {

            return;

        }


        adminProducts.forEach(
            product => {


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "card product-card";


                card.dataset.category =
                    product.category || "all";


                card.dataset.name =
                    product.name || "";


                const image =
                    product.image ||
                    "phone.png";


                const price =
                    Number(
                        product.price || 0
                    );


                card.innerHTML = `

                    <div class="product-image">

                        <div class="product-label">
                            🆕 Нав
                        </div>

                        <img
                            src="${window.OrivoStore ? window.OrivoStore.imageSrc(image) : "images/" + escapeHtml(image)}"
                            alt="${escapeHtml(product.name)}"
                        >

                    </div>


                    <div class="product-content">

                        <div class="product-top">

                            <span class="product-category">

                                🛍 Marketplace

                            </span>

                        </div>


                        <h2>
                            ${escapeHtml(product.name)}
                        </h2>


                        <div class="rating">

                            ⭐⭐⭐⭐⭐

                            <span>
                                5.0
                            </span>

                        </div>


                        <p class="price">

                            ${formatPrice(price)}
                            сомонӣ

                        </p>


                        <div class="product-buttons">

                            <button
                                type="button"
                                class="add-cart-button"
                                data-name="${escapeHtml(product.name)}"
                                data-price="${price}"
                                data-image="${escapeHtml(image)}"
                                data-category="${escapeHtml(product.category || "all")}"
                            >

                                🛒 Ба сабад

                            </button>


                            <button
                                type="button"
                                class="wishlist-button"
                                data-name="${escapeHtml(product.name)}"
                                data-price="${price}"
                                data-image="${escapeHtml(image)}"
                                data-category="${escapeHtml(product.category || "all")}"
                            >

                                ❤️

                            </button>

                        </div>

                    </div>

                `;


                newProducts.appendChild(
                    card
                );

            }
        );


        attachProductButtons();

        attachWishlistButtons();

        updateWishlistButtons();

    }


    /* ==================================================
       INITIALIZE
    ================================================== */

    attachProductButtons();

    attachWishlistButtons();

    updateCartCount();

    updateWishlistCount();

    updateWishlistButtons();

    renderCart();

    loadAdminProducts();

    const navToggle = document.getElementById("navToggle");
    const siteMenu = document.getElementById("siteMenu");

    if (navToggle && siteMenu) {
        navToggle.addEventListener("click", function () {
            siteMenu.classList.toggle("is-open");
        });
    }

    const filterToggle = document.getElementById("filterToggle");
    const filtersPanel = document.getElementById("filtersPanel");
    const filterBackdrop = document.getElementById("filterBackdrop");

    function closeFilters() {
        if (filtersPanel) {
            filtersPanel.classList.remove("is-open");
        }
        if (filterBackdrop) {
            filterBackdrop.classList.remove("is-open");
        }
    }

    if (filterToggle && filtersPanel) {
        filterToggle.addEventListener("click", function () {
            filtersPanel.classList.toggle("is-open");
            if (filterBackdrop) {
                filterBackdrop.classList.toggle("is-open", filtersPanel.classList.contains("is-open"));
            }
        });
    }

    if (filterBackdrop) {
        filterBackdrop.addEventListener("click", closeFilters);
    }

    ["minPrice", "maxPrice", "ratingFilter", "onlyDiscount"].forEach(function (id) {
        const node = document.getElementById(id);
        if (node) {
            node.addEventListener("input", applyListingFilters);
            node.addEventListener("change", applyListingFilters);
        }
    });

    const sortSelect = document.getElementById("sortSelect");

    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            const grid = document.getElementById("products");
            if (!grid) {
                return;
            }

            const cards = Array.from(grid.querySelectorAll(".product-card"));
            const mode = sortSelect.value;

            cards.sort(function (a, b) {
                const pa = Number((a.querySelector(".add-cart-button") || {}).dataset.price || 0);
                const pb = Number((b.querySelector(".add-cart-button") || {}).dataset.price || 0);
                const na = a.dataset.name || "";
                const nb = b.dataset.name || "";

                if (mode === "price-asc") {
                    return pa - pb;
                }
                if (mode === "price-desc") {
                    return pb - pa;
                }
                if (mode === "name") {
                    return na.localeCompare(nb);
                }
                return 0;
            });

            cards.forEach(function (card) {
                grid.appendChild(card);
            });
        });
    }

    function rememberRecent(item) {
        var list = JSON.parse(localStorage.getItem("orivoRecent") || "[]");
        list = list.filter(function (entry) {
            return entry.name !== item.name;
        });
        list.unshift(item);
        localStorage.setItem("orivoRecent", JSON.stringify(list.slice(0, 8)));
    }

    document.querySelectorAll(".hero-shot").forEach(function (shot) {
        shot.addEventListener("click", function () {
            var item = {
                name: shot.dataset.name,
                price: shot.dataset.price,
                image: shot.dataset.image,
                category: shot.dataset.category
            };
            localStorage.setItem("selectedProduct", JSON.stringify(item));
            rememberRecent(item);
            window.location.href = "product.html";
        });
    });

    var recentSection = document.getElementById("recentSection");
    var recentGrid = document.getElementById("recentGrid");

    if (recentSection && recentGrid) {
        var recent = JSON.parse(localStorage.getItem("orivoRecent") || "[]");
        if (recent.length) {
            recentSection.hidden = false;
            recentGrid.innerHTML = recent.map(function (item) {
                return "<button type='button' class='related-card recent-item' data-name='" +
                    item.name + "' data-price='" + item.price +
                    "' data-image='" + item.image +
                    "' data-category='" + (item.category || "") +
                    "'><img src='images/" + item.image +
                    "' alt=''><span>" + item.name + "</span></button>";
            }).join("");

            recentGrid.addEventListener("click", function (event) {
                var card = event.target.closest(".recent-item");
                if (!card) {
                    return;
                }
                var item = {
                    name: card.dataset.name,
                    price: card.dataset.price,
                    image: card.dataset.image,
                    category: card.dataset.category
                };
                localStorage.setItem("selectedProduct", JSON.stringify(item));
                rememberRecent(item);
                window.location.href = "product.html";
            });
        }
    }

    document.querySelectorAll(".product-card").forEach(function (card) {
        const rating = card.querySelector(".rating");

        if (rating && !card.querySelector(".review-count")) {
            const count = document.createElement("span");
            count.className = "review-count";
            count.textContent = " (48)";
            rating.appendChild(count);
        }

        if (card.querySelector(".product-label.sale")) {
            const price = card.querySelector(".price");
            const btn = card.querySelector(".add-cart-button");
            if (price && btn && !card.querySelector(".old-price")) {
                const old = document.createElement("span");
                old.className = "old-price";
                old.textContent = formatPrice(Math.round(Number(btn.dataset.price) * 1.18)) + " сомонӣ";
                price.appendChild(old);
            }
        }

        card.addEventListener("click", function (event) {
            if (event.target.closest("button")) {
                return;
            }

            const btn = card.querySelector(".add-cart-button");
            if (!btn) {
                return;
            }

            localStorage.setItem("selectedProduct", JSON.stringify({
                name: btn.dataset.name,
                price: btn.dataset.price,
                image: btn.dataset.image,
                category: btn.dataset.category
            }));

            rememberRecent({
                name: btn.dataset.name,
                price: btn.dataset.price,
                image: btn.dataset.image,
                category: btn.dataset.category
            });

            window.location.href = "product.html";
        });
    });


});