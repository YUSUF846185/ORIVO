// =====================================
// PRODUCT DETAILS
// =====================================


// Маҳсулоти интихобшуда

const product =
    JSON.parse(
        localStorage.getItem(
            "selectedProduct"
        )
    );


// =====================================
// ELEMENTS
// =====================================

const productImage =
    document.getElementById(
        "productImage"
    );

const productName =
    document.getElementById(
        "productName"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const addCart =
    document.getElementById(
        "addCart"
    );

const commentButton =
    document.getElementById(
        "commentButton"
    );

const commentsBox =
    document.getElementById(
        "commentsBox"
    );


// =====================================
// SHOW PRODUCT
// =====================================

if (product) {

    var info =
        window.OrivoCatalog
            ? window.OrivoCatalog.get(product)
            : null;

    productImage.src = window.OrivoStore
        ? window.OrivoStore.imageSrc(product.image)
        : ("images/" + product.image);

    productName.innerText =
        product.name;

    productPrice.innerText =
        product.price;

    document.title = product.name + " | ORIVO";

    var recent = JSON.parse(localStorage.getItem("orivoRecent") || "[]");
    recent = recent.filter(function (entry) {
        return entry.name !== product.name;
    });
    recent.unshift({
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
    });
    localStorage.setItem("orivoRecent", JSON.stringify(recent.slice(0, 8)));

    if (info) {
        var about = document.getElementById("productAbout");
        var stock = document.getElementById("productStock");
        var brand = document.getElementById("productBrand");
        var delivery = document.getElementById("productDelivery");
        var warranty = document.getElementById("productWarranty");
        var crumbName = document.getElementById("crumbName");
        var crumbCategory = document.getElementById("crumbCategory");
        var specs = document.getElementById("productSpecs");
        var thumbs = document.getElementById("productThumbs");
        var related = document.getElementById("relatedProducts");

        if (about) {
            about.textContent = info.about;
        }
        if (stock) {
            stock.textContent = info.stock;
        }
        if (brand) {
            brand.textContent = info.brand + " · " + info.sku + " · " + info.color;
        }
        if (delivery) {
            delivery.textContent = "Расонидан: " + info.delivery;
        }
        if (warranty) {
            warranty.textContent = "Кафолат: " + info.warranty;
        }
        if (crumbName) {
            crumbName.textContent = product.name;
        }
        if (crumbCategory) {
            crumbCategory.textContent = product.category || "Маҳсулот";
        }
        if (specs) {
            specs.innerHTML = info.specs.map(function (row) {
                return "<tr><th>" + row[0] + "</th><td>" + row[1] + "</td></tr>";
            }).join("");
        }
        if (thumbs) {
            thumbs.innerHTML = info.gallery.map(function (file, index) {
                return "<button type='button' class='pdp-thumb" +
                    (index === 0 ? " active" : "") +
                    "' data-image='" + file +
                    "'><img src='images/" + file + "' alt=''></button>";
            }).join("");

            thumbs.addEventListener("click", function (event) {
                var button = event.target.closest(".pdp-thumb");
                if (!button) {
                    return;
                }
                productImage.src = "images/" + button.getAttribute("data-image");
                thumbs.querySelectorAll(".pdp-thumb").forEach(function (node) {
                    node.classList.toggle("active", node === button);
                });
            });
        }
        if (related) {
            var others = (window.OrivoCatalog.byCategory[product.category] || [])
                .filter(function (file) {
                    return file !== product.image;
                })
                .slice(0, 4);

            related.innerHTML = others.map(function (file) {
                var meta = window.OrivoCatalog.imageIndex[file] || {
                    name: "Маҳсулоти монанд",
                    price: product.price,
                    category: product.category
                };
                return "<button type='button' class='related-card' data-name='" +
                    meta.name + "' data-image='" + file +
                    "' data-price='" + meta.price +
                    "' data-category='" + meta.category +
                    "'><img src='images/" + file +
                    "' alt=''><span>" + meta.name + "</span></button>";
            }).join("");

            related.addEventListener("click", function (event) {
                var card = event.target.closest(".related-card");
                if (!card) {
                    return;
                }
                localStorage.setItem("selectedProduct", JSON.stringify({
                    name: card.getAttribute("data-name"),
                    price: card.getAttribute("data-price"),
                    image: card.getAttribute("data-image"),
                    category: card.getAttribute("data-category")
                }));
                window.location.reload();
            });
        }
    }

} else if (productImage) {
    window.location.href = "index.html";
}


function selectedQty() {
    const input = document.getElementById("productQty");
    const value = input ? Number(input.value) : 1;
    return value > 0 ? value : 1;
}


// =====================================
// ADD TO CART
// =====================================

if (!addCart) {
    // no cart button on this page
} else if (!product) {
    addCart.addEventListener("click", function () {
        window.location.href = "index.html";
    });
} else addCart.addEventListener(
    "click",
    function () {

        if (window.OrivoStore) {
            window.OrivoStore.addToCart(product, selectedQty());
        } else {
            let cart = JSON.parse(localStorage.getItem("orivoCart") || localStorage.getItem("cart") || "[]") || [];
            const existing = cart.find(function (item) { return item.name === product.name; });
            if (existing) {
                existing.quantity += selectedQty();
            } else {
                cart.push({
                    name: product.name,
                    price: Number(product.price),
                    image: product.image,
                    quantity: selectedQty()
                });
            }
            localStorage.setItem("orivoCart", JSON.stringify(cart));
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        alert("✅ Маҳсулот ба сабад илова шуд!");

    }
);


var buyNow = document.getElementById("buyNow");
if (buyNow && product) {
    buyNow.addEventListener("click", function () {
        if (window.OrivoStore) {
            window.OrivoStore.addToCart(product, selectedQty());
        }
        window.location.href = "checkout.html";
    });
} else if (buyNow) {
    buyNow.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}


// =====================================
// RATING
// =====================================

let selectedRating = 0;


function setRating(rating) {

    selectedRating =
        rating;


    document.getElementById(
        "ratingText"
    ).innerText =

        "Рейтинги шумо: "
        + rating
        + " ⭐";

}


// =====================================
// COMMENTS
// =====================================

function getComments() {

    return JSON.parse(

        localStorage.getItem(
            "comments_" +
            product.name
        )

    ) || [];

}


// =====================================
// ADD COMMENT
// =====================================

commentButton.addEventListener(
    "click",
    function () {


        const name =
            document.getElementById(
                "commentName"
            ).value.trim();


        const text =
            document.getElementById(
                "commentText"
            ).value.trim();



        if (name === "") {

            alert(
                "❗ Номи худро нависед."
            );

            return;

        }


        if (text === "") {

            alert(
                "❗ Шарҳро нависед."
            );

            return;

        }


        if (
            selectedRating === 0
        ) {

            alert(
                "❗ Аввал рейтинг интихоб кунед."
            );

            return;

        }



        let comments =
            getComments();



        const newComment = {

            name: name,

            text: text,

            rating:
                selectedRating,

            date:
                new Date()
                    .toLocaleString()

        };



        comments.push(
            newComment
        );



        localStorage.setItem(

            "comments_" +
            product.name,

            JSON.stringify(
                comments
            )

        );



        document.getElementById(
            "commentName"
        ).value = "";


        document.getElementById(
            "commentText"
        ).value = "";


        selectedRating = 0;


        document.getElementById(
            "ratingText"
        ).innerText =
            "Рейтинг интихоб нашудааст";


        showComments();


        alert(
            "✅ Шарҳи шумо илова шуд!"
        );

    }
);


// =====================================
// SHOW COMMENTS
// =====================================

function showComments() {

    const comments =
        getComments();


    commentsBox.innerHTML = "";


    if (
        comments.length === 0
    ) {

        commentsBox.innerHTML = `

            <p>
                💬 Ҳоло шарҳ нест.
            </p>

        `;

        return;

    }



    comments.forEach(
        comment => {


            let stars = "";


            for (
                let i = 0;
                i < comment.rating;
                i++
            ) {

                stars += "⭐";

            }



            commentsBox.innerHTML += `

                <div
                    style="
                    padding:15px;
                    margin:10px 0;
                    border:1px solid #ddd;
                    border-radius:10px;
                    "
                >

                    <h3>

                        👤
                        ${comment.name}

                    </h3>


                    <p>

                        ${stars}

                    </p>


                    <p>

                        ${comment.text}

                    </p>


                    <small>

                        🕐
                        ${comment.date}

                    </small>

                </div>

            `;

        }
    );

}


// =====================================
// START
// =====================================

showComments();
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const productQty = document.getElementById('productQty');
const buyNow = document.getElementById('buyNow');
if (qtyMinus && productQty) {
    qtyMinus.addEventListener('click', function () {
        productQty.value = Math.max(1, Number(productQty.value || 1) - 1);
    });
}
if (qtyPlus && productQty) {
    qtyPlus.addEventListener('click', function () {
        productQty.value = Number(productQty.value || 1) + 1;
    });
}
if (buyNow && addCart) {
    buyNow.addEventListener('click', function () {
        addCart.click();
        window.location.href = 'checkout.html';
    });
}
(function () {
    const themeButton = document.getElementById('themeButton');
    if (!themeButton) { return; }
    function refresh() {
        themeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
    refresh();
    themeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('orivoTheme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        refresh();
    });
})();
