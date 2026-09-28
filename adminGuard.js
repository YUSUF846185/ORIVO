(function () {
    var owner = window.OrivoAuth && window.OrivoAuth.isOwner
        ? window.OrivoAuth.isOwner()
        : localStorage.getItem("adminLoggedIn") === "true";

    if (!owner) {
        window.location.replace("index.html");
        return;
    }

    var adminUser = document.getElementById("adminUser");
    var user = window.OrivoAuth && window.OrivoAuth.getSession
        ? window.OrivoAuth.getSession()
        : null;

    if (adminUser) {
        adminUser.innerHTML = "Соҳиб: <b>" +
            ((user && user.name) || "ORIVO") +
            "</b>";
    }
})();
