/* =========================================================
   FASHIONHUB THEME SYSTEM
   Handles Light / Dark Mode on every page
========================================================= */

(function () {

    "use strict";

    const THEME_KEY = "fashionhub-theme";

    const toggle = document.getElementById("theme-toggle");

    /*
        Apply saved theme immediately.
        This makes the theme remain consistent
        when moving between pages.
    */
    function applyTheme(theme) {

        if (theme === "dark") {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.add("dark-theme");
            document.body.classList.add("dark-mode");
            document.body.classList.add("dark-theme");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.remove("dark-theme");
            document.body.classList.remove("dark-mode");
            document.body.classList.remove("dark-theme");
        }

        updateButton(theme);
    }


    /*
        Update accessibility information
    */
    function updateButton(theme) {

        if (!toggle) return;

        if (theme === "dark") {

            toggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            toggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            toggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            toggle.setAttribute(
                "title",
                "Switch to dark mode"
            );
        }
    }


    /*
        Get saved theme
    */
    let savedTheme = localStorage.getItem(THEME_KEY);


    /*
        If no theme has been saved,
        use the user's system preference.
    */
    if (!savedTheme) {

        savedTheme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
    }


    applyTheme(savedTheme);


    /*
        Theme toggle button
    */
    if (toggle) {

        toggle.addEventListener("click", function () {

            const isDark =
                document.documentElement.classList.contains("dark-theme") ||
                document.documentElement.classList.contains("dark-mode");

            const newTheme = isDark
                ? "light"
                : "dark";

            localStorage.setItem(
                THEME_KEY,
                newTheme
            );

            applyTheme(newTheme);

        });
    }

})();
