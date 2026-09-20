/* =========================================================
   FASHIONHUB CLOTHING PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const productImageFallback = "baggy t-shirts.jpg";

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
            name: "Oversized Premium Tee",
            price: 18500,
            image: "baggy t-shirts.jpg",
            description:
                "Premium heavyweight cotton oversized t-shirt made for everyday comfort."
        },

        2: {
            name: "Graphic Streetwear Tee",
            price: 20000,
            image: "baggy t-shirts.jpg",
            description:
                "Bold graphic streetwear tee designed for a modern casual look."
        },

        3: {
            name: "Minimal Premium Tee",
            price: 16000,
            image: "baggy t-shirts.jpg",
            description:
                "Clean minimal design with premium comfort and a relaxed fit."
        },

        4: {
            name: "Premium Cotton Tee",
            price: 22000,
            image: "baggy t-shirts.jpg",
            description:
                "Soft premium cotton tee designed for everyday wear."
        },

        5: {
            name: "Streetwear Tee",
            price: 19000,
            image: "baggy t-shirts.jpg",
            description:
                "Modern streetwear essential with a comfortable oversized fit."
        },

        6: {
            name: "Luxury Tee",
            price: 24500,
            image: "baggy t-shirts.jpg",
            description:
                "Premium luxury tee created for effortless everyday style."
        },

        7: {
            name: "Classic Black Tee",
            price: 17500,
            image: "baggy t-shirts.jpg",
            description:
                "Classic black tee that works with almost every outfit."
        },

        8: {
            name: "Classic White Tee",
            price: 17500,
            image: "baggy t-shirts.jpg",
            description:
                "Classic white premium tee for a clean timeless look."
        },

        9: {
            name: "Oversized Long Sleeve",
            price: 34990,
            image: "images/long1.jpg",
            description:
                "Comfortable oversized long sleeve designed for modern streetwear."
        },

        10: {
            name: "Luxury Cotton Long Sleeve",
            price: 39990,
            image: "images/long2.jpg",
            description:
                "Premium cotton long sleeve with a luxurious comfortable feel."
        },

        11: {
            name: "Graphic Long Sleeve",
            price: 35990,
            image: "images/long3.jpg",
            description:
                "Statement graphic long sleeve for a bold streetwear look."
        },

        12: {
            name: "Minimal Long Sleeve",
            price: 36990,
            image: "images/long4.jpg",
            description:
                "Minimal long sleeve with a clean premium aesthetic."
        },

        13: {
            name: "Casual Shorts",
            price: 24990,
            image: "images/short1.jpg",
            description:
                "Comfortable casual shorts for everyday activities."
        },

        14: {
            name: "Denim Shorts",
            price: 29990,
            image: "images/short2.jpg",
            description:
                "Classic denim shorts with a modern relaxed fit."
        },

        15: {
            name: "Cargo Shorts",
            price: 32990,
            image: "images/short3.jpg",
            description:
                "Utility-inspired cargo shorts with plenty of storage."
        },

        16: {
            name: "Sport Shorts",
            price: 26990,
            image: "images/short4.jpg",
            description:
                "Lightweight sport shorts built for comfort and movement."
        },

        17: {
            name: "Baggy Jeans",
            price: 54990,
            image: "images/jeans1.jpg",
            description:
                "Modern baggy jeans designed for a relaxed streetwear fit."
        },

        18: {
            name: "Wide Leg Denim",
            price: 59990,
            image: "images/jeans2.jpg",
            description:
                "Wide-leg denim with a modern oversized silhouette."
        },

        19: {
            name: "Distressed Jeans",
            price: 56990,
            image: "images/jeans3.jpg",
            description:
                "Premium distressed jeans with a bold streetwear aesthetic."
        },

        20: {
            name: "Oversized Denim",
            price: 61990,
            image: "images/jeans4.jpg",
            description:
                "Oversized premium denim designed for maximum style and comfort."
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
                localStorage.getItem("fashionhub-cart")
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

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 600);

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const hamburger =
        document.querySelector(".hamburger");

    const links =
        document.querySelector(".links");

    const overlay =
        document.querySelector(".overlay");


    function closeMobileMenu() {

        links?.classList.remove("active");
        hamburger?.classList.remove("active");
        overlay?.classList.remove("active");

    }


    hamburger?.addEventListener(
        "click",
        () => {

            links?.classList.toggle("active");
            hamburger?.classList.toggle("active");
            overlay?.classList.toggle("active");

        }
    );


    overlay?.addEventListener(
        "click",
        closeMobileMenu
    );


    /* =====================================================
       MODAL ELEMENTS
    ===================================================== */

    const modal =
        document.getElementById("productModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalPrice =
        document.getElementById("modalPrice");

    const modalDescription =
        document.getElementById("modalDescription");

    const closeModal =
        document.querySelector(".close-modal");


    let selectedProduct = null;
    let quantity = 1;


    /* =====================================================
       OPEN QUICK VIEW
    ===================================================== */

    document
        .querySelectorAll(".quick-view")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.product
                        );

                    const product =
                        products[id];

                    if (!product) return;

                    selectedProduct = {
                        ...product,
                        id
                    };

                    quantity = 1;

                    if (modalImage) {
                        modalImage.src =
                            product.image;

                        modalImage.alt =
                            product.name;
                    }

                    if (modalTitle) {
                        modalTitle.textContent =
                            product.name;
                    }

                    if (modalPrice) {
                        modalPrice.textContent =
                            formatPrice(product.price);
                    }

                    if (modalDescription) {
                        modalDescription.textContent =
                            product.description;
                    }

                    const qty =
                        document.getElementById("qty");

                    if (qty) {
                        qty.textContent = "1";
                    }

                    modal?.classList.add("active");

                    modal?.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function hideModal() {

        modal?.classList.remove("active");

        modal?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    closeModal?.addEventListener(
        "click",
        hideModal
    );


    modal?.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                hideModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                hideModal();
            }

        }
    );


    /* =====================================================
       THUMBNAILS
    ===================================================== */

    document
        .querySelectorAll(".thumb")
        .forEach(thumb => {

            thumb.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".thumb")
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    thumb.classList.add(
                        "active"
                    );

                    if (modalImage) {
                        modalImage.src =
                            thumb.src;
                    }

                }
            );

        });


    /* =====================================================
       SIZE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".sizes button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".sizes button"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add(
                        "active"
                    );

                }
            );

        });


    /* =====================================================
       COLORS
    ===================================================== */

    document
        .querySelectorAll(".colors span")
        .forEach(color => {

            color.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".colors span"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    color.classList.add(
                        "active"
                    );

                }
            );

        });


    /* =====================================================
       QUANTITY
    ===================================================== */

    const minus =
        document.getElementById("minus");

    const plus =
        document.getElementById("plus");

    const qty =
        document.getElementById("qty");


    minus?.addEventListener(
        "click",
        () => {

            if (quantity > 1) {
                quantity--;
            }

            if (qty) {
                qty.textContent = quantity;
            }

        }
    );


    plus?.addEventListener(
        "click",
        () => {

            if (quantity < 99) {
                quantity++;
            }

            if (qty) {
                qty.textContent = quantity;
            }

        }
    );


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const addToCart =
        document.getElementById("addToCartBtn");


    addToCart?.addEventListener(
        "click",
        () => {

            if (!selectedProduct) return;

            const cart = getCart();

            const existing =
                cart.find(
                    item =>
                        item.id ===
                        selectedProduct.id
                );


            if (existing) {

                existing.quantity +=
                    quantity;

            } else {

                cart.push({

                    id: selectedProduct.id,

                    name: selectedProduct.name,

                    price: selectedProduct.price,

                    image: selectedProduct.image,

                    quantity: quantity

                });

            }


            saveCart(cart);

            updateCart();

            hideModal();

            openCart();

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

                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        button.textContent =
                            "♥";

                    } else {

                        button.textContent =
                            "❤";

                    }

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

    const cartNavButton =
        document.getElementById("cartNavBtn");

    const cartClose =
        document.getElementById("cartClose");


    function openCart() {

        cartDrawer?.classList.add("active");

        cartOverlay?.classList.add("active");

        document.body.classList.add(
            "cart-open"
        );

    }


    function closeCart() {

        cartDrawer?.classList.remove(
            "active"
        );

        cartOverlay?.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "cart-open"
        );

    }


    cartNavButton?.addEventListener(
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

        const cart = getCart();

        if (!cartItems) return;


        cartItems.innerHTML = "";


        let total = 0;
        let itemCount = 0;


        cart.forEach((item, index) => {

            total +=
                item.price *
                item.quantity;

            itemCount +=
                item.quantity;


            const itemElement =
                document.createElement("div");

            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

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
                    aria-label="Remove ${item.name}"
                >
                    ×
                </button>

            `;


            cartItems.appendChild(
                itemElement
            );

        });


        if (cartEmpty) {

            cartEmpty.style.display =
                cart.length === 0
                    ? "block"
                    : "none";

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(total);

        }


        if (cartCount) {

            cartCount.textContent =
                itemCount;

        }


        addCartControls();

    }


    /* =====================================================
       CART CONTROLS
    ===================================================== */

    function addCartControls() {

        document
            .querySelectorAll(".cart-minus")
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
            .querySelectorAll(".cart-plus")
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

    const checkoutButton =
        document.getElementById("checkoutBtn");


    checkoutButton?.addEventListener(
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

            window.location.href =
                "checkout.html";

        }
    );


    /* =====================================================
       BUY NOW
    ===================================================== */

    const buyButton =
        document.querySelector(".buy-btn");


    buyButton?.addEventListener(
        "click",
        () => {

            if (!selectedProduct) return;

            const cart = getCart();

            const existing =
                cart.find(
                    item =>
                        item.id ===
                        selectedProduct.id
                );


            if (existing) {

                existing.quantity +=
                    quantity;

            } else {

                cart.push({

                    id: selectedProduct.id,

                    name: selectedProduct.name,

                    price: selectedProduct.price,

                    image: selectedProduct.image,

                    quantity: quantity

                });

            }


            saveCart(cart);

            window.location.href =
                "checkout.html";

        }
    );


    /* =====================================================
       INITIAL CART
    ===================================================== */

    updateCart();


    /* =====================================================
       ESC KEY FOR CART
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeCart();
            }

        }
    );

});
