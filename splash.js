(function () {

    var splash = document.getElementById("orivoSplash");

    if (!splash) {
        return;
    }

    var stars = document.getElementById("orivoStars");

    if (stars && !stars.childElementCount) {
        var count = 72;
        var html = "";
        var i;

        for (i = 0; i < count; i += 1) {
            html +=
                "<span style=\"left:" +
                (Math.random() * 100).toFixed(2) +
                "%;top:" +
                (Math.random() * 58).toFixed(2) +
                "%;animation-delay:" +
                (Math.random() * 3).toFixed(2) +
                "s;width:" +
                (1 + Math.random() * 2).toFixed(1) +
                "px;height:" +
                (1 + Math.random() * 2).toFixed(1) +
                "px\"></span>";
        }

        stars.innerHTML = html;
    }

    function closeSplash() {
        if (splash.classList.contains("is-done")) {
            return;
        }

        splash.classList.add("is-done");
        document.body.classList.remove("splash-open");

        setTimeout(function () {
            if (splash && splash.parentNode) {
                splash.parentNode.removeChild(splash);
            }
        }, 900);
    }

    document.body.classList.add("splash-open");

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            splash.classList.add("is-playing");
        });
    });

    splash.addEventListener("click", closeSplash);

    splash.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            closeSplash();
        }
    });

    splash.setAttribute("tabindex", "0");

    var page = (location.pathname.split("/").pop() || "").toLowerCase();
    if (page.indexOf("splash-preview") === -1) {
        setTimeout(closeSplash, 9000);
    }

})();
