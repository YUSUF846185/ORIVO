(function () {
    if (document.getElementById("orivoSupportFab")) {
        return;
    }

    var page = (window.location.pathname.split("/").pop() || "").toLowerCase();
    if (
        page === "dashboard.html" ||
        page === "admin.html" ||
        page === "admin-login.html" ||
        page === "sales.html"
    ) {
        return;
    }

    function agentPortrait(prefix) {
        return (
            '<svg viewBox="0 0 80 80" aria-hidden="true">' +
            '<defs>' +
            '<linearGradient id="' + prefix + 'Bg" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#d9f3e6"/>' +
            '<stop offset="100%" stop-color="#b7e4cd"/>' +
            '</linearGradient>' +
            '<linearGradient id="' + prefix + 'Skin" x1="0.3" y1="0.1" x2="0.8" y2="1">' +
            '<stop offset="0%" stop-color="#f4c7a3"/>' +
            '<stop offset="100%" stop-color="#e0a57a"/>' +
            '</linearGradient>' +
            '<linearGradient id="' + prefix + 'Hair" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#3a2418"/>' +
            '<stop offset="100%" stop-color="#1c100c"/>' +
            '</linearGradient>' +
            '</defs>' +
            '<circle cx="40" cy="40" r="40" fill="url(#' + prefix + 'Bg)"/>' +
            '<path d="M14 72c4-16 14-24 26-24s22 8 26 24" fill="#08764d"/>' +
            '<path d="M18 72c3-10 10-16 22-16s19 6 22 16" fill="#0a5c3d"/>' +
            '<circle cx="40" cy="34" r="15" fill="url(#' + prefix + 'Skin)"/>' +
            '<path d="M26 33c1-12 6-18 14-18s13 6 14 18c-4-4-9-6-14-6s-10 2-14 6z" fill="url(#' + prefix + 'Hair)"/>' +
            '<path d="M27 36c2-3 5-5 8-5" fill="none" stroke="#c48a62" stroke-width="1.2" stroke-linecap="round"/>' +
            '<circle cx="34.2" cy="34.2" r="1.3" fill="#2a1c14"/>' +
            '<circle cx="45.8" cy="34.2" r="1.3" fill="#2a1c14"/>' +
            '<path d="M36.5 40.5c1.4 1.4 5.6 1.4 7 0" fill="none" stroke="#c48a62" stroke-width="1.3" stroke-linecap="round"/>' +
            '<path d="M20 36c0-16 8-24 20-24s20 8 20 24" fill="none" stroke="#1a1a1a" stroke-width="3.4" stroke-linecap="round"/>' +
            '<rect x="17" y="33" width="7" height="11" rx="3.5" fill="#111"/>' +
            '<rect x="56" y="33" width="7" height="11" rx="3.5" fill="#111"/>' +
            '<rect x="18.4" y="35" width="4.2" height="7" rx="2" fill="#3a3a3a"/>' +
            '<rect x="57.4" y="35" width="4.2" height="7" rx="2" fill="#3a3a3a"/>' +
            '<path d="M59.5 38v10a8 8 0 0 1-8 8H40" fill="none" stroke="#111" stroke-width="2.6" stroke-linecap="round"/>' +
            '<circle cx="40" cy="56.5" r="3.4" fill="#111"/>' +
            '<circle cx="40" cy="56.5" r="1.6" fill="#08764d"/>' +
            '</svg>'
        );
    }

    var fab = document.createElement("button");
    fab.id = "orivoSupportFab";
    fab.type = "button";
    fab.setAttribute("aria-label", "Мушовири ORIVO");
    fab.innerHTML =
        '<span class="support-fab-copy">' +
        '<strong>Ёрӣ</strong>' +
        '<small>Мушовир онлайн</small>' +
        '</span>' +
        '<span class="support-fab-photo">' + agentPortrait("fab") +
        '<span class="agent-online"></span>' +
        '</span>';

    var panel = document.createElement("div");
    panel.id = "orivoSupportPanel";
    panel.hidden = true;
    panel.innerHTML =
        "<div class='support-head'>" +
        "<div class='support-avatar' aria-hidden='true'>" + agentPortrait("panel") + "</div>" +
        "<div class='support-agent'>" +
        "<strong>Мушовири ORIVO</strong>" +
        "<small>Онлайн · ҷавоб дар чанд дақиқа</small>" +
        "</div>" +
        "<button type='button' id='orivoSupportClose' aria-label='Пӯшидан'>×</button>" +
        "</div>" +
        "<div class='support-body'>" +
        "<p class='support-lead'>Савол доред? Интихоб кунед ё худатон нависед.</p>" +
        "<div class='support-chips'>" +
        "<button type='button' data-q='Чӣ тавр фармоиш диҳам?'>Фармоиш</button>" +
        "<button type='button' data-q='Расонидан чанд рӯз аст?'>Расонидан</button>" +
        "<button type='button' data-q='Чӣ хел пардохт кунам?'>Пардохт</button>" +
        "</div>" +
        "<label>Номи шумо<input id='supportName' type='text' placeholder='Масалан, Алишер'></label>" +
        "<label>Телефон ё email<input id='supportContact' type='text' placeholder='+992 ...'></label>" +
        "<label>Паём<textarea id='supportText' rows='3' placeholder='Саволатонро нависед...'></textarea></label>" +
        "<button type='button' id='supportSend' class='auth-submit'>Фиристодан</button>" +
        "<p id='supportStatus' class='support-status'></p>" +
        "</div>";

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    function toggle(open) {
        panel.hidden = !open;
        fab.classList.toggle("is-open", open);
    }

    fab.addEventListener("click", function () {
        toggle(panel.hidden);
    });

    document.getElementById("orivoSupportClose").addEventListener("click", function () {
        toggle(false);
    });

    panel.querySelectorAll(".support-chips button").forEach(function (chip) {
        chip.addEventListener("click", function () {
            document.getElementById("supportText").value = chip.getAttribute("data-q");
            document.getElementById("supportText").focus();
        });
    });

    document.getElementById("supportSend").addEventListener("click", function () {
        var name = document.getElementById("supportName").value.trim();
        var contact = document.getElementById("supportContact").value.trim();
        var text = document.getElementById("supportText").value.trim();
        var status = document.getElementById("supportStatus");

        if (!name || !text) {
            status.textContent = "Ном ва паёмро нависед.";
            return;
        }

        var messages = JSON.parse(localStorage.getItem("orivoSupportMessages") || "[]");
        messages.unshift({
            id: Date.now(),
            name: name,
            contact: contact,
            text: text,
            page: page || "index.html",
            date: new Date().toLocaleString(),
            read: false
        });
        localStorage.setItem("orivoSupportMessages", JSON.stringify(messages));

        document.getElementById("supportName").value = "";
        document.getElementById("supportContact").value = "";
        document.getElementById("supportText").value = "";
        status.textContent = "Паём расид. Мушовир ҷавоб медиҳад.";
    });
})();
