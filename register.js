// =====================================
// REGISTER SYSTEM
// =====================================

// Тугмаи сабти ном
const registerButton =
    document.getElementById("registerButton");


// =====================================
// REGISTER
// =====================================

function createAccount() {

        // -----------------------------
        // Гирифтани маълумот
        // -----------------------------

        const name =
            document
                .getElementById("registerName")
                .value
                .trim();

        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("registerPassword")
                .value;

        const confirmPassword =
            document
                .getElementById(
                    "registerConfirmPassword"
                )
                .value;


        // -----------------------------
        // Санҷиши ном
        // -----------------------------

        if (name === "") {

            alert(
                "❗ Лутфан номи худро нависед."
            );

            return;
        }


        // -----------------------------
        // Санҷиши Email
        // -----------------------------

        if (email === "") {

            alert(
                "❗ Лутфан Email-ро нависед."
            );

            return;
        }


        if (!email.includes("@")) {

            alert(
                "❗ Email нодуруст аст."
            );

            return;
        }


        // -----------------------------
        // Санҷиши парол
        // -----------------------------

        if (password.length < 6) {

            alert(
                "❗ Парол бояд камаш 6 аломат дошта бошад."
            );

            return;
        }


        // -----------------------------
        // Санҷиши парол
        // -----------------------------

        if (
            password !==
            confirmPassword
        ) {

            alert(
                "❗ Паролҳо якхел нестанд."
            );

            return;
        }


        // =================================
        // Гирифтани ҳамаи Users
        // =================================

        let users = [];
        if (window.OrivoAuth && window.OrivoAuth.mergeUsers) {
            users = window.OrivoAuth.mergeUsers();
        } else {
            users = JSON.parse(localStorage.getItem("users") || "[]") || [];
        }


        // =================================
        // Санҷиши Email-и такрорӣ
        // =================================

        const existingUser =
            users.find(
                user =>
                    (window.OrivoAuth
                        ? window.OrivoAuth.normEmail(user.email || user.login || user.username)
                        : String(user.email || "").toLowerCase()) === email
            );


        if (existingUser) {

            alert(
                "❌ Ин Email аллакай сабт шудааст."
            );

            return;
        }


        // =================================
        // ROLE
        // =================================

        /*
            Барои корбари оддӣ:

            role = "user"

            Барои Admin:

            role = "admin"
        */

        const role = "user";
        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            role: role,

            owner: false,

            createdAt:
                new Date().toLocaleString()

        };


        // =================================
        // Илова кардани User
        // =================================

        users.push(newUser);


        // =================================
        // Нигоҳ доштани Users
        // =================================

        if (window.OrivoAuth && window.OrivoAuth.persistUsers) {
            window.OrivoAuth.persistUsers(users);
            window.OrivoAuth.setSession(newUser);
        } else {
            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );
            localStorage.setItem(
                "currentUser",
                JSON.stringify(newUser)
            );
        }


        // =================================
        // Паёми муваффақият
        // =================================

        alert(
            "🎉 Аккаунт бо муваффақият сохта шуд!"
        );


        // =================================
        // Гузаштан ба Marketplace
        // =================================

        window.location.replace("index.html");

}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        createAccount();
    });
} else if (registerButton) {
    registerButton.addEventListener("click", createAccount);
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
