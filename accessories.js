/* =========================================================
   FASHIONHUB ACCESSORIES JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const productImageFallback = "banner.jfif";

    document.addEventListener("error", (event) => {
        const image = event.target;

        if (image instanceof HTMLImageElement && image.closest(".product-image, .quick-view-modal")) {
            image.src = productImageFallback;
        }
    }, true);

    document.querySelectorAll(".product-image img").forEach((image) => {
        image.src = productImageFallback;
    });


    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const products = {

        1: {
            name: "Classic Black Watch",
            price: 45000,
            image: "images/watch1.jpg",
            description: "A timeless black watch designed for everyday elegance."
        },

        2: {
            name: "Luxury Silver Watch",
            price: 65000,
            image: "images/watch2.jpg",
            description: "Premium silver watch with a sophisticated modern finish."
        },

        3: {
            name: "Minimal Gold Watch",
            price: 72000,
            image: "images/watch3.jpg",
            description: "Elegant gold watch with a clean minimalist design."
        },

        4: {
            name: "Sport Chronograph Watch",
            price: 58000,
            image: "images/watch4.jpg",
            description: "Sport-inspired chronograph watch for an active lifestyle."
        },

        5: {
            name: "Premium Crossbody Bag",
            price: 35000,
            image: "images/bag1.jpg",
            description: "Premium crossbody bag for everyday essentials."
        },

        6: {
            name: "Urban Shoulder Bag",
            price: 39500,
            image: "images/bag2.jpg",
            description: "Modern shoulder bag designed for urban lifestyles."
        },

        7: {
            name: "Luxury Mini Bag",
            price: 42000,
            image: "images/bag3.jpg",
            description: "Compact luxury bag with a premium finish."
        },

        8: {
            name: "Streetwear Backpack",
            price: 49000,
            image: "images/bag4.jpg",
            description: "Stylish streetwear backpack with practical storage."
        },

        9: {
            name: "Classic Black Cap",
            price: 15000,
            image: "images/cap1.jpg",
            description: "Classic black cap that works with any casual outfit."
        },

        10: {
            name: "Premium Logo Cap",
            price: 18000,
            image: "images/cap2.jpg",
            description: "Premium logo cap designed for everyday streetwear."
        },

        11: {
            name: "Streetwear Cap",
            price: 17500,
            image: "images/cap3.jpg",
            description: "Modern streetwear cap with a relaxed look."
        },

        12: {
            name: "Vintage Washed Cap",
            price: 16500,
            image: "images/cap4.jpg",
            description: "Vintage-inspired washed cap with a relaxed finish."
        },

        13: {
            name: "Classic Black Sunglasses",
            price: 25000,
            image: "images/sun1.jpg",
            description: "Classic black sunglasses for a sharp everyday look."
        },

        14: {
            name: "Luxury Gold Sunglasses",
            price: 31000,
            image: "images/sun2.jpg",
            description: "Luxury gold sunglasses with a premium finish."
        },

        15: {
            name: "Retro Frame Sunglasses",
            price: 28000,
            image: "images/sun3.jpg",
            description: "Retro-inspired frames for a distinctive style."
        },

        16: {
            name: "Premium Street Sunglasses",
            price: 29500,
            image: "images/sun4.jpg",
            description: "Premium streetwear sunglasses designed for confidence."
        },

        17: {
            name: "Silver Chain",
            price: 22000,
            image: "images/jewelry1.jpg",
            description: "Minimal silver chain that adds a refined finishing touch."
        },

        18: {
            name: "Minimal Bracelet",
            price: 18500,
            image: "images/jewelry2.jpg",
            description: "Simple premium bracelet for everyday styling."
        },

        19: {
            name: "Premium Ring",
            price: 20000,
            image: "images/jewelry3.jpg",
            description: "Premium ring with a modern minimalist design."
        },

        20: {
            name: "Luxury Pendant",
            price: 27000,
            image: "images/jewelry4.jpg",
            description: "Elegant luxury pendant designed to make a statement."
        }

    };


    /* =====================================================
       HELPERS
    ===================================================== */

    function formatPrice(price) {

        return "₦" +
            Number(price).toLocaleString("en-NG");

    }


    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "fashionhub-cart"
                )
            ) || [];

        } catch {

            return [];

        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            "fashionhub-cart",
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       LOADER
    ===================================================== */

    const loader =
        document.getElementById("loader");

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    loader?.classList.add(
                        "hide"
                    );

                },
                600
            );

        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const hamburger =
        document.querySelector(".hamburger");

    const links =
        document.querySelector(".links");

    const overlay =
        document.querySelector(".overlay");


    hamburger?.addEventListener(
        "click",
        () => {

            links?.classList.toggle(
                "active"
            );

            hamburger?.classList.toggle(
                "active"
            );

            overlay?.classList.toggle(
                "active"
            );

        }
    );


    overlay?.addEventListener(
        "click",
        () => {

            links?.classList.remove(
                "active"
            );

            hamburger?.classList.remove(
                "active"
            );

            overlay?.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       WISHLIST
    ===================================================== */

    document
        .querySelectorAll(".wishlist-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );

                    button.textContent =
                        button.classList.contains(
                            "active"
                        )
                            ? "♥"
                            : "❤";

                }
            );

        });


    /* =====================================================
       CART
    ===================================================== */

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItems =
        document.getElementById("cartItems");

    const cartEmpty =
        document.getElementById("cartEmpty");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");

    const cartNavBtn =
        document.getElementById("cartNavBtn");

    const cartClose =
        document.getElementById("cartClose");


    function openCart() {

        cartDrawer?.classList.add(
            "active"
        );

        cartOverlay?.classList.add(
            "active"
        );

    }


    function closeCart() {

        cartDrawer?.classList.remove(
            "active"
        );

        cartOverlay?.classList.remove(
            "active"
        );

    }


    cartNavBtn?.addEventListener(
        "click",
        openCart
    );


    cartClose?.addEventListener(
        "click",
        closeCart
    );


    cartOverlay?.addEventListener(
        "click",
        closeCart
    );


    /* =====================================================
       UPDATE CART
    ===================================================== */

    function updateCart() {

        const cart =
            getCart();

        if (!cartItems) return;

        cartItems.innerHTML = "";

        let total = 0;
        let count = 0;


        cart.forEach((item, index) => {

            total +=
                item.price *
                item.quantity;

            count +=
                item.quantity;


            const element =
                document.createElement(
                    "div"
                );

            element.className =
                "cart-item";


            element.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${formatPrice(item.price)}
                    </p>

                    <div class="cart-quantity">

                        <button
                            class="cart-minus"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="cart-plus"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart-item"
                    data-index="${index}"
                >
                    ×
                </button>
            `;


            cartItems.appendChild(
                element
            );

        });


        if (cartEmpty) {

            cartEmpty.style.display =
                cart.length
                    ? "none"
                    : "block";

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(total);

        }


        if (cartCount) {

            cartCount.textContent =
                count;

        }


        setupCartControls();

    }


    /* =====================================================
       CART CONTROLS
    ===================================================== */

    function setupCartControls() {

        document
            .querySelectorAll(
                ".cart-minus"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const cart =
                            getCart();

                        const index =
                            Number(
                                button.dataset.index
                            );

                        if (
                            cart[index] &&
                            cart[index].quantity > 1
                        ) {

                            cart[index].quantity--;

                        } else {

                            cart.splice(
                                index,
                                1
                            );

                        }

                        saveCart(cart);

                        updateCart();

                    }
                );

            });


        document
            .querySelectorAll(
                ".cart-plus"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const cart =
                            getCart();

                        const index =
                            Number(
                                button.dataset.index
                            );

                        if (cart[index]) {

                            cart[index].quantity++;

                        }

                        saveCart(cart);

                        updateCart();

                    }
                );

            });


        document
            .querySelectorAll(
                ".remove-cart-item"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const cart =
                            getCart();

                        const index =
                            Number(
                                button.dataset.index
                            );

                        cart.splice(
                            index,
                            1
                        );

                        saveCart(cart);

                        updateCart();

                    }
                );

            });

    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    const checkout =
        document.getElementById(
            "checkoutBtn"
        );


    checkout?.addEventListener(
        "click",
        () => {

            if (!getCart().length) {

                alert(
                    "Your cart is empty."
                );

                return;
            }

            window.location.href =
                "checkout.html";

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCart();

});
