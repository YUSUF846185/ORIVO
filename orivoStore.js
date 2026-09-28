(function (global) {
    function parse(key, fallback) {
        try {
            var raw = localStorage.getItem(key);
            if (raw == null || raw === "") {
                return fallback;
            }
            var value = JSON.parse(raw);
            return value == null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function write(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function mergeLists() {
        var lists = [];
        var i;
        for (i = 0; i < arguments.length; i += 1) {
            lists = lists.concat(arguments[i] || []);
        }
        return lists;
    }

    function uniqueByName(list) {
        var seen = {};
        var out = [];
        list.forEach(function (item) {
            if (!item) {
                return;
            }
            var key = String(item.id || item.name || Math.random());
            if (seen[key]) {
                return;
            }
            seen[key] = true;
            out.push(item);
        });
        return out;
    }

    function migrate() {
        var cart = uniqueByName(mergeLists(parse("orivoCart", []), parse("cart", [])));
        write("orivoCart", cart);
        write("cart", cart);

        var wish = uniqueByName(mergeLists(parse("orivoWishlist", []), parse("wishlist", [])));
        write("orivoWishlist", wish);
        write("wishlist", wish);

        var orders = mergeLists(parse("orivoOrders", []), parse("orders", []));
        write("orivoOrders", orders);
        write("orders", orders);

        var extras = uniqueByName(mergeLists(
            parse("orivoAdminProducts", []),
            parse("orivoProducts", []).filter(function (item) {
                return item && String(item.id || "").indexOf("product-") === 0;
            }),
            parse("products", [])
        ));
        write("orivoAdminProducts", extras);
    }

    migrate();

    function getCart() {
        return parse("orivoCart", []);
    }

    function setCart(items) {
        write("orivoCart", items);
        write("cart", items);
    }

    function addToCart(product, qty) {
        var amount = Number(qty) > 0 ? Number(qty) : 1;
        var cart = getCart();
        var existing = cart.find(function (item) {
            return item.name === product.name;
        });
        if (existing) {
            existing.quantity = Number(existing.quantity || 1) + amount;
        } else {
            cart.push({
                name: product.name,
                price: Number(product.price || 0),
                image: product.image,
                category: product.category || "",
                quantity: amount
            });
        }
        setCart(cart);
        return cart;
    }

    function getWishlist() {
        return parse("orivoWishlist", []);
    }

    function setWishlist(items) {
        write("orivoWishlist", items);
        write("wishlist", items);
    }

    function getOrders() {
        return parse("orivoOrders", []);
    }

    function setOrders(items) {
        write("orivoOrders", items);
        write("orders", items);
    }

    function addOrder(order) {
        var orders = getOrders();
        orders.unshift(order);
        setOrders(orders);
        return orders;
    }

    function getExtraProducts() {
        return parse("orivoAdminProducts", []);
    }

    function setExtraProducts(items) {
        write("orivoAdminProducts", items);
        var catalog = parse("orivoProducts", []);
        var keep = catalog.filter(function (item) {
            return item && String(item.id || "").indexOf("product-") !== 0;
        });
        write("orivoProducts", keep.concat(items));
        write("products", items);
    }

    function imageSrc(file) {
        if (!file) {
            return "images/phone.png";
        }
        var value = String(file);
        if (
            value.indexOf("data:") === 0 ||
            value.indexOf("http") === 0 ||
            value.indexOf("images/") === 0 ||
            value.indexOf("blob:") === 0
        ) {
            return value;
        }
        return "images/" + value;
    }

    function setupAccountBar() {
        var area = document.getElementById("userArea");
        if (!area || !global.OrivoAuth || !global.OrivoAuth.getSession) {
            return;
        }
        var user = global.OrivoAuth.getSession();
        if (!user) {
            return;
        }
        var owner = global.OrivoAuth.isOwner && global.OrivoAuth.isOwner();
        area.innerHTML =
            '<a href="settings.html" class="header-link">' +
            (user.name || "Ҳисоб") +
            "</a>" +
            (owner ? '<a href="admin.html" class="header-link">Панел</a>' : "") +
            '<button type="button" class="header-link" id="orivoLogout">Баромад</button>';
        var out = document.getElementById("orivoLogout");
        if (out) {
            out.addEventListener("click", function () {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("adminLoggedIn");
                if (global.name && String(global.name).indexOf("ORIVOAUTH1:") === 0) {
                    global.name = "";
                }
                global.location.replace("login.html");
            });
        }
    }

    global.OrivoStore = {
        getCart: getCart,
        setCart: setCart,
        addToCart: addToCart,
        getWishlist: getWishlist,
        setWishlist: setWishlist,
        getOrders: getOrders,
        setOrders: setOrders,
        addOrder: addOrder,
        getExtraProducts: getExtraProducts,
        setExtraProducts: setExtraProducts,
        imageSrc: imageSrc,
        setupAccountBar: setupAccountBar
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupAccountBar);
    } else {
        setupAccountBar();
    }
})(window);
