(function (global) {
    var SESSION_KEY = "currentUser";
    var USER_KEYS = ["users", "orivoUsers"];
    var NAME_PREFIX = "ORIVOAUTH1:";

    function parseJSON(raw, fallback) {
        if (raw == null || raw === "") {
            return fallback;
        }
        try {
            return JSON.parse(raw);
        } catch (error) {
            return fallback;
        }
    }

    function readName() {
        var value = String(global.name || "");
        if (value.indexOf(NAME_PREFIX) !== 0) {
            return null;
        }
        return parseJSON(value.slice(NAME_PREFIX.length), null);
    }

    function writeName(state) {
        try {
            global.name = NAME_PREFIX + JSON.stringify(state);
        } catch (error) {}
    }

    function nameState() {
        var state = readName();
        if (!state || typeof state !== "object") {
            state = { user: null, users: [] };
        }
        if (!Array.isArray(state.users)) {
            state.users = [];
        }
        return state;
    }

    function normEmail(value) {
        return String(value || "").trim().toLowerCase();
    }

    function userEmail(user) {
        if (!user) {
            return "";
        }
        return normEmail(user.email || user.login || user.username);
    }

    function userPassword(user) {
        if (!user || user.password == null) {
            return "";
        }
        return String(user.password);
    }

    function addUsers(map, list) {
        (list || []).forEach(function (user) {
            var key = userEmail(user);
            if (key) {
                map[key] = user;
            }
        });
    }

    function mergeUsers() {
        var map = {};
        var list = [];

        USER_KEYS.forEach(function (key) {
            var stored = parseJSON(localStorage.getItem(key), []);
            addUsers(map, Array.isArray(stored) ? stored : []);
        });
        addUsers(map, nameState().users);

        Object.keys(map).forEach(function (key) {
            list.push(map[key]);
        });
        return list;
    }

    function persistUsers(list) {
        var raw = JSON.stringify(list || []);
        USER_KEYS.forEach(function (key) {
            try {
                localStorage.setItem(key, raw);
            } catch (error) {}
        });
        var state = nameState();
        state.users = list || [];
        writeName(state);
    }

    function getSession() {
        var user = parseJSON(localStorage.getItem(SESSION_KEY), null);
        if (!userEmail(user)) {
            user = nameState().user;
        }
        if (userEmail(user)) {
            setSession(user, false);
            return user;
        }
        return null;
    }

    function setSession(user, mergeList) {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        } catch (error) {}
        var state = nameState();
        state.user = user;
        if (mergeList !== false) {
            state.users = mergeUsers();
        }
        writeName(state);
    }

    function findUser(email, password) {
        var wanted = normEmail(email);
        var typed = String(password == null ? "" : password);
        var typedTrim = typed.trim();
        var users = mergeUsers();
        var sameEmail = users.filter(function (user) {
            return userEmail(user) === wanted;
        });

        if (!sameEmail.length) {
            return { status: users.length ? "missing" : "empty" };
        }

        var match = sameEmail.find(function (user) {
            var stored = userPassword(user);
            return stored === typed || stored === typedTrim || stored.trim() === typedTrim;
        });

        return match ? { status: "ok", user: match } : { status: "badpass" };
    }

    function seedOwner() {
        var users = mergeUsers();
        var hasOwner = users.some(function (user) {
            return user && (user.owner === true || user.role === "admin");
        });
        if (hasOwner) {
            return;
        }
        users.unshift({
            id: 1,
            name: "Соҳиби ORIVO",
            email: "owner@orivo.tj",
            password: "12345",
            role: "admin",
            owner: true
        });
        persistUsers(users);
    }

    function isOwner() {
        if (localStorage.getItem("adminLoggedIn") === "true") {
            return true;
        }
        var user = getSession();
        return !!(user && (user.owner === true || user.role === "admin"));
    }

    seedOwner();

    global.OrivoAuth = {
        mergeUsers: mergeUsers,
        persistUsers: persistUsers,
        getSession: getSession,
        setSession: setSession,
        findUser: findUser,
        normEmail: normEmail,
        isOwner: isOwner
    };

    var file = (global.location.pathname.split("/").pop() || "").toLowerCase();
    if (!file || file === "/") {
        file = "index.html";
    }

    var loggedIn = !!getSession();

    if (file === "login.html" || file === "register.html") {
        if (loggedIn && file === "login.html") {
            global.location.replace("index.html");
        }
        return;
    }

    if (
        file === "admin.html" ||
        file === "dashboard.html" ||
        file === "sales.html"
    ) {
        if (!isOwner()) {
            global.location.replace("index.html");
        }
        return;
    }

    if (file === "admin-login.html") {
        if (isOwner()) {
            global.location.replace("admin.html");
        }
        return;
    }

    if (!loggedIn) {
        global.location.replace("login.html");
    }
})(window);
