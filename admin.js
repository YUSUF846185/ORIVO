```javascript id="7f3k2a"
// =====================================
// ADMIN PRODUCT SYSTEM
// =====================================


// =====================================
// ELEMENTS
// =====================================

const productName =
    document.getElementById(
        "productName"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const productCategory =
    document.getElementById(
        "productCategory"
    );

const productImage =
    document.getElementById(
        "productImage"
    );

const productDescription =
    document.getElementById(
        "productDescription"
    );

const addProductButton =
    document.getElementById(
        "addProductButton"
    );

const adminProducts =
    document.getElementById(
        "adminProducts"
    );


// =====================================
// PRODUCTS
// =====================================

let products =
    JSON.parse(
        localStorage.getItem(
            "products"
        )
    ) || [];


// =====================================
// EDITING PRODUCT
// =====================================

let editingIndex = -1;


// =====================================
// ADD PRODUCT
// =====================================

addProductButton.addEventListener(
    "click",
    function () {


        // -----------------------------
        // GET DATA
        // -----------------------------

        const name =
            productName.value.trim();

        const price =
            Number(
                productPrice.value
            );

        const category =
            productCategory.value;

        const image =
            productImage.value.trim();

        const description =
            productDescription.value.trim();



        // -----------------------------
        // CHECK NAME
        // -----------------------------

        if (name === "") {

            alert(
                "❗ Номи маҳсулотро нависед."
            );

            return;

        }



        // -----------------------------
        // CHECK PRICE
        // -----------------------------

        if (
            isNaN(price) ||
            price <= 0
        ) {

            alert(
                "❗ Нархро дуруст ворид кунед."
            );

            return;

        }



        // -----------------------------
        // CHECK IMAGE
        // -----------------------------

        if (image === "") {

            alert(
                "❗ Номи файли суратро нависед."
            );

            return;

        }



        // -----------------------------
        // CREATE PRODUCT
        // -----------------------------

        const product = {

            id:
                Date.now(),

            name:
                name,

            price:
                price,

            category:
                category,

            image:
                image,

            description:
                description,

            createdAt:
                new Date().toLocaleString()

        };



        // =================================
        // EDIT
        // =================================

        if (
            editingIndex !== -1
        ) {

            products[
                editingIndex
            ].name =
                name;

            products[
                editingIndex
            ].price =
                price;

            products[
                editingIndex
            ].category =
                category;

            products[
                editingIndex
            ].image =
                image;

            products[
                editingIndex
            ].description =
                description;


            editingIndex =
                -1;


            addProductButton.innerText =
                "➕ Илова кардани маҳсулот";


            alert(
                "✅ Маҳсулот нав карда шуд."
            );

        }

        // =================================
        // ADD
        // =================================

        else {

            products.push(
                product
            );


            alert(
                "🎉 Маҳсулот илова шуд."
            );

        }



        // =================================
        // SAVE
        // =================================

        localStorage.setItem(
            "products",
            JSON.stringify(
                products
            )
        );



        // =================================
        // CLEAR FORM
        // =================================

        clearForm();



        // =================================
        // SHOW PRODUCTS
        // =================================

        showAdminProducts();

    }
);


// =====================================
// SHOW PRODUCTS
// =====================================

function showAdminProducts() {

    adminProducts.innerHTML =
        "";


    if (
        products.length === 0
    ) {

        adminProducts.innerHTML = `

            <div
                style="
                grid-column:1/-1;
                text-align:center;
                padding:40px;
                "
            >

                <h2>

                    📦 Ҳоло маҳсулот нест.

                </h2>

                <p>

                    Аввал маҳсулот илова кунед.

                </p>

            </div>

        `;

        return;

    }



    products.forEach(
        (product, index) => {


            adminProducts.innerHTML += `

                <div
                    style="
                    border:1px solid #ddd;
                    border-radius:15px;
                    padding:15px;
                    background:white;
                    "
                >


                    <!-- IMAGE -->

                    <img
                        src="images/${product.image}"
                        alt="${product.name}"
                        style="
                        width:100%;
                        height:180px;
                        object-fit:cover;
                        border-radius:10px;
                        "
                        onerror="
                        this.src='images/no-image.png'
                        "
                    >



                    <!-- NAME -->

                    <h3>

                        ${product.name}

                    </h3>



                    <!-- PRICE -->

                    <p>

                        💰

                        <b>

                            ${product.price}

                            сомонӣ

                        </b>

                    </p>



                    <!-- CATEGORY -->

                    <p>

                        📂

                        ${getCategoryName(
                            product.category
                        )}

                    </p>



                    <!-- DESCRIPTION -->

                    <p>

                        ${
                            product.description ||
                            "Тавсиф нест."
                        }

                    </p>



                    <!-- EDIT -->

                    <button
                        onclick="
                        editProduct(
                            ${index}
                        )
                        "
                    >

                        ✏️ Таҳрир

                    </button>



                    <!-- DELETE -->

                    <button
                        onclick="
                        deleteProduct(
                            ${index}
                        )
                        "
                    >

                        🗑 Нест кардан

                    </button>


                </div>

            `;

        }
    );

}


// =====================================
// EDIT PRODUCT
// =====================================

function editProduct(
    index
) {

    const product =
        products[index];


    if (!product) {

        return;

    }


    productName.value =
        product.name;

    productPrice.value =
        product.price;

    productCategory.value =
        product.category;

    productImage.value =
        product.image;

    productDescription.value =
        product.description;


    editingIndex =
        index;


    addProductButton.innerText =
        "💾 Нигоҳ доштани тағйирот";


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


// =====================================
// DELETE PRODUCT
// =====================================

function deleteProduct(
    index
) {

    const product =
        products[index];


    if (!product) {

        return;

    }


    const answer =
        confirm(
            `Оё маҳсулоти "${product.name}"-ро нест мекунед?`
        );


    if (!answer) {

        return;

    }


    products.splice(
        index,
        1
    );


    localStorage.setItem(
        "products",
        JSON.stringify(
            products
        )
    );


    showAdminProducts();


    alert(
        "🗑 Маҳсулот нест карда шуд."
    );

}


// =====================================
// CLEAR FORM
// =====================================

function clearForm() {

    productName.value =
        "";

    productPrice.value =
        "";

    productCategory.value =
        "all";

    productImage.value =
        "";

    productDescription.value =
        "";

}


// =====================================
// CATEGORY NAME
// =====================================

function getCategoryName(
    category
) {

    const categories = {

        all:
            "Ҳама",

        electronics:
            "📱 Электроника",

        clothes:
            "👕 Либос",

        shoes:
            "👟 Пойафзол",

        home:
            "🏠 Барои хона",

        other:
            "📦 Дигар"

    };


    return (
        categories[category] ||
        "📦 Дигар"
    );

}


// =====================================
// START
// =====================================

showAdminProducts();
```
