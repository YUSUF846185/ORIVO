const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function () {
    var username = document.getElementById("adminUsername").value.trim();
    var password = document.getElementById("adminPassword").value;
    var email = username.toLowerCase();
    var ownerOk =
        (username === "admin" || email === "owner@orivo.tj") &&
        password === "12345";

    var found = null;
    if (window.OrivoAuth && window.OrivoAuth.findUser) {
        var result = window.OrivoAuth.findUser(
            email.indexOf("@") === -1 ? "owner@orivo.tj" : email,
            password
        );
        if (result && result.status === "ok" && result.user &&
            (result.user.owner === true || result.user.role === "admin")) {
            found = result.user;
        }
    }

    if (!ownerOk && !found) {
        alert("❌ Танҳо соҳиби мағоза метавонад ин ҷо ворид шавад.");
        return;
    }

    var owner = found || {
        id: 1,
        name: "Соҳиби ORIVO",
        email: "owner@orivo.tj",
        password: password,
        role: "admin",
        owner: true
    };

    localStorage.setItem("adminLoggedIn", "true");
    if (window.OrivoAuth && window.OrivoAuth.setSession) {
        window.OrivoAuth.setSession(owner);
    } else {
        localStorage.setItem("currentUser", JSON.stringify(owner));
    }

    window.location.replace("admin.html");
});
