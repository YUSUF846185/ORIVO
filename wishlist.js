// =====================================
// WISHLIST
// =====================================

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "wishlist"
        )
    ) || [];


const wishlistProducts =
    document.getElementById(
        "wishlistProducts"
    );


// =====================================
// SHOW WISHLIST
// =====================================

function showWishlist() {

    wishlistProducts.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistProducts.innerHTML = `

            <div class="cart">

                <h2>
                    ❤️ Ҳоло маҳсулоти дӯстдошта нест.
                </h2>

                <p>
                    Ба мағоза баргардед ва
                    маҳсулотро ❤️ кунед.
                </p>

            </div>

        `;

        return;
    }


    wishlist.forEach(
        (product, index) => {

            wishlistProducts.innerHTML += `

                <div class="card">

                    <img
                        src="images/${product.image}"
                    >


                    <h2>
                        ${product.name}
                    </h2>


                    <p class="price">

                        ${product.price}
                        сомонӣ

                    </p>


                    <button
                        onclick="
                        addToCart(${index})
                        "
                    >

                        🛒 Ба сабад

                    </button>


                    <button
                        onclick="
                        removeWishlist(${index})
                        "
                    >

                        💔 Хориҷ кардан

                    </button>

                </div>

            `;

        }
    );

}


// =====================================
// ADD TO CART
// =====================================

function addToCart(index) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];


    const product =
        wishlist[index];


    const existing =
        cart.find(
            item =>
                item.name ===
                product.name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name:
                product.name,

            price:
                Number(
                    product.price
                ),

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        "🛒 Маҳсулот ба сабад илова шуд!"
    );

}


// =====================================
// REMOVE
// =====================================

function removeWishlist(index) {

    wishlist.splice(
        index,
        1
    );


    localStorage.setItem(
        "wishlist",
        JSON.stringify(
            wishlist
        )
    );


    showWishlist();

}


// =====================================
// START
// =====================================

showWishlist();