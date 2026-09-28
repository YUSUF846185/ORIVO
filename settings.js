document.addEventListener("DOMContentLoaded", function () {

    var languageButtons =
        document.querySelectorAll("[data-lang]");

    var themeButtons =
        document.querySelectorAll("[data-theme]");


    function currentLang() {
        if (window.OrivoI18n) {
            return window.OrivoI18n.getLang();
        }

        return localStorage.getItem("orivoLang") || "tg";
    }


    function currentTheme() {
        return localStorage.getItem("orivoTheme") || "light";
    }


    function markActive(buttons, attr, value) {
        buttons.forEach(function (button) {
            button.classList.toggle(
                "active",
                button.getAttribute(attr) === value
            );
        });
    }


    function refresh() {
        markActive(
            languageButtons,
            "data-lang",
            currentLang()
        );

        markActive(
            themeButtons,
            "data-theme",
            currentTheme()
        );
    }


    languageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            var lang = button.getAttribute("data-lang");

            if (window.OrivoI18n) {
                window.OrivoI18n.setLang(lang);
            } else {
                localStorage.setItem("orivoLang", lang);
            }

            refresh();

        });

    });


    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            var theme = button.getAttribute("data-theme");

            localStorage.setItem("orivoTheme", theme);

            if (theme === "dark") {
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");
            }

            refresh();

        });

    });


    refresh();

    var logout = document.getElementById("orivoLogoutSettings");
    if (logout) {
        logout.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("adminLoggedIn");
            if (window.name && String(window.name).indexOf("ORIVOAUTH1:") === 0) {
                window.name = "";
            }
            window.location.replace("login.html");
        });
    }

    if (window.OrivoAuth && window.OrivoAuth.isOwner && window.OrivoAuth.isOwner()) {
        var back = document.querySelector(".settings-back");
        if (back && !document.getElementById("orivoOwnerSettings")) {
            var panel = document.createElement("a");
            panel.id = "orivoOwnerSettings";
            panel.href = "admin.html";
            panel.className = "settings-back";
            panel.textContent = "Панели соҳиб — бор кардани маҳсулот";
            back.parentNode.insertBefore(panel, back);
        }
    }

});
