/* =========================================================
   FASHIONHUB CHECKOUT JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader?.classList.add("hide");
        }, 700);
    });


    /* =====================================================
       SETTINGS
    ===================================================== */

    const DELIVERY_FEE = 2500;

    const CART_KEY =
        "fashionhub-cart";


    /* =====================================================
       HELPERS
    ===================================================== */

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    CART_KEY
                )
            ) || [];

        } catch {

            return [];

        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    }


    function formatPrice(price) {

        return "₦" +
            Number(price).toLocaleString(
                "en-NG"
            );

    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );

    const checkoutEmpty =
        document.getElementById(
            "checkoutEmpty"
        );

    const checkoutItemCount =
        document.getElementById(
            "checkoutItemCount"
        );

    const checkoutSubtotal =
        document.getElementById(
            "checkoutSubtotal"
        );

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );

    const deliveryFee =
        document.getElementById(
            "deliveryFee"
        );

    const placeOrderBtn =
        document.getElementById(
            "placeOrderBtn"
        );

    const successModal =
        document.getElementById(
            "successModal"
        );

    const orderNumber =
        document.getElementById(
            "orderNumber"
        );


    /* =====================================================
       LOAD ORDER SUMMARY
    ===================================================== */

    function updateCheckout() {

        const cart =
            getCart();


        if (!checkoutItems) return;


        checkoutItems.innerHTML = "";


        let subtotal = 0;

        let itemCount = 0;


        cart.forEach(item => {

            const itemTotal =
                item.price *
                item.quantity;


            subtotal +=
                itemTotal;


            itemCount +=
                item.quantity;


            const element =
                document.createElement(
                    "div"
                );

            element.className =
                "checkout-item";


            element.innerHTML = `

                <div class="checkout-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <div class="checkout-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                </div>

            `;


            checkoutItems.appendChild(
                element
            );

        });


        /* =================================================
           EMPTY CART
        ================================================= */

        if (checkoutEmpty) {

            checkoutEmpty.style.display =
                cart.length === 0
                    ? "block"
                    : "none";

        }


        /* =================================================
           ITEM COUNT
        ================================================= */

        if (checkoutItemCount) {

            checkoutItemCount.textContent =
                `${itemCount} ${
                    itemCount === 1
                        ? "item"
                        : "items"
                }`;

        }


        /* =================================================
           SUBTOTAL
        ================================================= */

        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatPrice(subtotal);

        }


        /* =================================================
           DELIVERY
        ================================================= */

        if (deliveryFee) {

            deliveryFee.textContent =
                cart.length
                    ? formatPrice(
                        DELIVERY_FEE
                    )
                    : "₦0";

        }


        /* =================================================
           TOTAL
        ================================================= */

        const total =
            cart.length
                ? subtotal + DELIVERY_FEE
                : 0;


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatPrice(total);

        }


        /* =================================================
           DISABLE ORDER BUTTON
        ================================================= */

        if (placeOrderBtn) {

            placeOrderBtn.disabled =
                cart.length === 0;

        }

    }


    /* =====================================================
       FORM VALIDATION
    ===================================================== */

    function validateForm() {

        const fields = [

            document.getElementById(
                "fullName"
            ),

            document.getElementById(
                "email"
            ),

            document.getElementById(
                "phone"
            ),

            document.getElementById(
                "address"
            ),

            document.getElementById(
                "city"
            ),

            document.getElementById(
                "state"
            )

        ];


        let valid = true;


        fields.forEach(field => {

            if (!field) return;


            field.classList.remove(
                "input-error"
            );


            if (!field.value.trim()) {

                field.classList.add(
                    "input-error"
                );

                valid = false;

            }

        });


        /* EMAIL VALIDATION */

        const email =
            document.getElementById(
                "email"
            );


        if (
            email &&
            email.value.trim()
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                email.classList.add(
                    "input-error"
                );

                valid = false;

            }

        }


        return valid;

    }


    /* =====================================================
       PLACE ORDER
    ===================================================== */

    placeOrderBtn?.addEventListener(
        "click",
        () => {

            const cart =
                getCart();


            if (!cart.length) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            if (!validateForm()) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            /* =============================================
               PAYMENT METHOD
            ============================================= */

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            const paymentMethod =
                payment
                    ? payment.value
                    : "paystack";


            /*
                This is currently a frontend order
                simulation.

                Real Paystack payment should be
                connected to a backend/payment API.
            */

            placeOrderBtn.disabled = true;

            placeOrderBtn.textContent =
                "Processing Order...";


            setTimeout(
                () => {

                    createOrder(
                        paymentMethod
                    );

                },
                1200
            );

        }
    );


    /* =====================================================
       CREATE ORDER
    ===================================================== */

    function createOrder(
        paymentMethod
    ) {

        const cart =
            getCart();


        const orderId =
            "FH" +
            Date.now()
                .toString()
                .slice(-8);


        const order = {

            id: orderId,

            customer: {

                name:
                    document.getElementById(
                        "fullName"
                    )?.value.trim(),

                email:
                    document.getElementById(
                        "email"
                    )?.value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    )?.value.trim(),

                address:
                    document.getElementById(
                        "address"
                    )?.value.trim(),

                city:
                    document.getElementById(
                        "city"
                    )?.value.trim(),

                state:
                    document.getElementById(
                        "state"
                    )?.value.trim()

            },

            payment:
                paymentMethod,

            products:
                cart,

            createdAt:
                new Date().toISOString()

        };


        /*
            Save order locally.
            Later this can be replaced with
            your backend/database.
        */

        localStorage.setItem(
            "fashionhub-last-order",
            JSON.stringify(order)
        );


        /* Clear shopping cart */

        saveCart([]);


        /* Show order number */

        if (orderNumber) {

            orderNumber.textContent =
                `Order #${orderId}`;

        }


        /* Show success */

        if (successModal) {

            successModal.classList.add(
                "active"
            );

        }


        placeOrderBtn.disabled = false;

        placeOrderBtn.textContent =
            "Place Order →";

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCheckout();


    /* =====================================================
       REMOVE INPUT ERROR WHEN USER TYPES
    ===================================================== */

    document
        .querySelectorAll(
            "input, textarea"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    input.classList.remove(
                        "input-error"
                    );

                }
            );

        });

});
