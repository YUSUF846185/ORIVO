// =====================================
// ADMIN DASHBOARD
// =====================================


// =====================================
// CHECK ADMIN LOGIN
// =====================================

if (!(window.OrivoAuth && window.OrivoAuth.isOwner && window.OrivoAuth.isOwner()) &&
    localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.replace("index.html");
}


// =====================================
// GET DATA
// =====================================

let products =
    window.OrivoStore
        ? window.OrivoStore.getExtraProducts()
        : (JSON.parse(localStorage.getItem("orivoAdminProducts") || localStorage.getItem("products") || "[]") || []);


let orders =
    window.OrivoStore
        ? window.OrivoStore.getOrders()
        : (JSON.parse(localStorage.getItem("orivoOrders") || localStorage.getItem("orders") || "[]") || []);


// =====================================
// PRODUCTS COUNT
// =====================================

const productsCount =
    document.getElementById(
        "productsCount"
    );


if (productsCount) {

    productsCount.innerText =
        products.length;

}


// =====================================
// ORDERS COUNT
// =====================================

const ordersCount =
    document.getElementById(
        "ordersCount"
    );


if (ordersCount) {

    ordersCount.innerText =
        orders.length;

}


// =====================================
// CUSTOMERS
// =====================================

const customersCount =
    document.getElementById(
        "customersCount"
    );


let customers = [];


orders.forEach(
    order => {

        if (
            order.phone &&
            !customers.includes(
                order.phone
            )
        ) {

            customers.push(
                order.phone
            );

        }

    }
);


if (customersCount) {

    customersCount.innerText =
        customers.length;

}


// =====================================
// TOTAL SALES
// =====================================

const totalSales =
    document.getElementById(
        "totalSales"
    );


let total = 0;


orders.forEach(
    order => {


        // Агар total дошта бошад

        if (
            order.total
        ) {

            total +=
                Number(
                    order.total
                );

        }


        // Агар total надошта бошад

        else if (
            order.products
        ) {

            order.products.forEach(
                product => {

                    const quantity =
                        Number(
                            product.quantity
                        ) || 1;


                    const price =
                        Number(
                            product.price
                        ) || 0;


                    total +=
                        price *
                        quantity;

                }
            );

        }

    }
);


if (totalSales) {

    totalSales.innerText =
        total;

}


// =====================================
// ADD LOGOUT BUTTON
// =====================================

const logoutButton =
    document.createElement(
        "button"
    );


logoutButton.innerText =
    "🚪 Баромадан";


logoutButton.style.margin =
    "20px";


logoutButton.style.padding =
    "12px 25px";


logoutButton.style.fontSize =
    "16px";


logoutButton.style.cursor =
    "pointer";


logoutButton.style.border =
    "none";


logoutButton.style.borderRadius =
    "10px";


// =====================================
// LOGOUT FUNCTION
// =====================================

logoutButton.onclick =
    function () {


        const answer =
            confirm(
                "❓ Мехоҳед аз Admin бароед?"
            );


        if (!answer) {

            return;

        }


        localStorage.removeItem(
            "adminLoggedIn"
        );


        alert(
            "👋 Шумо аз Admin баромадед."
        );


        window.location =
            "admin-login.html";

    };


// =====================================
// ADD BUTTON TO PAGE
// =====================================

document.body.appendChild(
    logoutButton
);


var supportBox = document.getElementById("supportMessages");

if (supportBox) {
    var notes = JSON.parse(localStorage.getItem("orivoSupportMessages") || "[]");

    if (notes.length === 0) {
        supportBox.innerHTML = "<p>Ҳоло паём нест.</p>";
    } else {
        supportBox.innerHTML = notes.map(function (note) {
            return "<article class='support-note'>" +
                "<h3>" + note.name + "</h3>" +
                "<p>" + (note.contact || "Бе контакт") + " · " + note.date + "</p>" +
                "<p>" + note.text + "</p>" +
                "<small>Саҳифа: " + note.page + "</small>" +
                "</article>";
        }).join("");
    }
}