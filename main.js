/* =========================================================
   FASHIONHUB MAIN PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 700);

    });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progressBar =
        document.querySelector(".scroll-progress");

    function updateScrollProgress() {

        if (!progressBar) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width =
            `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress
    );

    updateScrollProgress();


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const hamburger =
        document.querySelector(".hamburger");

    const navLinks =
        document.querySelector(".links");

    const overlay =
        document.querySelector(".overlay");


    function openMenu() {

        if (navLinks) {
            navLinks.classList.add("active");
        }

        if (hamburger) {
            hamburger.classList.add("active");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (hamburger) {
            hamburger.classList.remove("active");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");
    }


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            () => {

                if (
                    navLinks &&
                    navLinks.classList.contains("active")
                ) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMenu
        );

    }


    if (navLinks) {

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(
            element => observer.observe(element)
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add("show")
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            '.links a[href^="#"]'
        );


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       SHOP NOW BUTTON
    ===================================================== */

    const shopButton =
        document.querySelector(".shop-btn");

    if (shopButton) {

        shopButton.addEventListener(
            "click",
            () => {

                const products =
                    document.getElementById("products");

                if (products) {

                    products.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       EXPLORE COLLECTION
    ===================================================== */

    const learnButton =
        document.querySelector(".learn-btn");

    if (learnButton) {

        learnButton.addEventListener(
            "click",
            () => {

                const products =
                    document.getElementById("products");

                if (products) {

                    products.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


});









