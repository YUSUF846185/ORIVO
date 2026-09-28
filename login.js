const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");

function signIn() {
    var emailInput = document.getElementById("loginEmail");
    var passwordInput = document.getElementById("loginPassword");
    var email = emailInput ? emailInput.value.trim().toLowerCase() : "";
    var password = passwordInput ? passwordInput.value : "";

    if (email === "") {
        alert("❗ Email-ро нависед.");
        return;
    }

    if (password === "") {
        alert("❗ Паролро нависед.");
        return;
    }

    var result;
    try {
        if (window.OrivoAuth && window.OrivoAuth.findUser) {
            result = window.OrivoAuth.findUser(email, password);
        } else {
            var users = JSON.parse(localStorage.getItem("users") || "[]") || [];
            var user = users.find(function (item) {
                return item &&
                    String(item.email || "").toLowerCase() === email &&
                    String(item.password) === password;
            });
            result = user ? { status: "ok", user: user } : { status: "missing" };
        }
    } catch (error) {
        alert("❗ Хатогӣ ҳангоми воридшавӣ. Бори дигар кӯшиш кунед.");
        return;
    }

    if (!result || result.status !== "ok") {
        if (result && result.status === "empty") {
            alert("❌ Аккаунт ёфт нашуд. Аввал сабти ном кунед.");
        } else if (result && result.status === "badpass") {
            alert("❌ Парол нодуруст аст.");
        } else {
            alert("❌ Ин Email сабт нашудааст. Сабти ном кунед ё Email-ро санҷед.");
        }
        return;
    }

    if (window.OrivoAuth && window.OrivoAuth.setSession) {
        window.OrivoAuth.setSession(result.user);
    } else {
        localStorage.setItem("currentUser", JSON.stringify(result.user));
    }

    window.location.replace("index.html");
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        signIn();
    });
} else if (loginButton) {
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        signIn();
    });
}

(function () {
    const themeButton = document.getElementById("themeButton");

    if (!themeButton) {
        return;
    }

    function refreshThemeIcon() {
        themeButton.textContent = document.body.classList.contains("dark-mode")
            ? "☀️"
            : "🌙";
    }

    refreshThemeIcon();

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "orivoTheme",
            document.body.classList.contains("dark-mode") ? "dark" : "light"
        );
        refreshThemeIcon();
    });
})();
