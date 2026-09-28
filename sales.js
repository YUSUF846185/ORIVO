// =====================================
// SALES DASHBOARD
// =====================================


// Фармоишҳоро мегирем

const orders =
    window.OrivoStore
        ? window.OrivoStore.getOrders()
        : (JSON.parse(localStorage.getItem("orivoOrders") || localStorage.getItem("orders") || "[]") || []);


// =====================================
// CANVAS
// =====================================

const canvas =
    document.getElementById(
        "salesChart"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


// =====================================
// SALES DATA
// =====================================

let sales = [];


orders.forEach(
    (order, index) => {

        let total = 0;


        if (order.total) {

            total =
                Number(
                    order.total
                );

        }

        else if (
            order.products
        ) {

            order.products.forEach(
                product => {

                    const price =
                        Number(
                            product.price
                        ) || 0;


                    const quantity =
                        Number(
                            product.quantity
                        ) || 1;


                    total +=
                        price *
                        quantity;

                }
            );

        }


        sales.push({

            label:
                "Фармоиш " +
                (index + 1),

            value:
                total

        });

    }
);


// =====================================
// TOTAL
// =====================================

let totalSales = 0;


sales.forEach(
    item => {

        totalSales +=
            item.value;

    }
);


document.getElementById(
    "totalSales"
).innerText =
    totalSales +
    " сомонӣ";


// =====================================
// EMPTY
// =====================================

if (
    sales.length === 0
) {

    ctx.font =
        "20px Arial";

    ctx.fillText(
        "📭 Ҳоло фурӯш нест",
        230,
        180
    );

}


// =====================================
// GRAPH
// =====================================

if (
    sales.length > 0
) {


    const maxValue =
        Math.max(
            ...sales.map(
                item =>
                    item.value
            )
        );


    const chartWidth =
        canvas.width - 100;


    const chartHeight =
        canvas.height - 80;


    const barWidth =
        chartWidth /
        sales.length -
        20;



    // AXIS

    ctx.beginPath();

    ctx.moveTo(
        50,
        20
    );

    ctx.lineTo(
        50,
        canvas.height - 50
    );

    ctx.lineTo(
        canvas.width - 20,
        canvas.height - 50
    );

    ctx.stroke();



    // BARS

    sales.forEach(
        (item, index) => {


            const barHeight =
                (
                    item.value /
                    maxValue
                ) *
                chartHeight;


            const x =
                70 +
                index *
                (
                    barWidth +
                    20
                );


            const y =
                canvas.height -
                50 -
                barHeight;



            // BAR

            ctx.fillRect(
                x,
                y,
                barWidth,
                barHeight
            );



            // VALUE

            ctx.font =
                "14px Arial";


            ctx.fillText(
                item.value,
                x,
                y - 8
            );



            // LABEL

            ctx.fillText(
                item.label,
                x,
                canvas.height - 25
            );

        }
    );

}