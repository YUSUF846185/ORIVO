window.OrivoCatalog = (function () {
    var byCategory = {
        phone: ["phone.png", "samsung-s24.png", "xiaomi-14.png"],
        laptop: ["laptop.png", "hp-pavilion.png", "asus-vivobook.png"],
        headphones: ["headphones.png", "sony-xm5.png", "jbl-tune.png"],
        watch: ["watch.png", "samsung-watch6.png"],
        tv: ["tv.png", "samsung-qled.png"],
        home: ["dyson-v15.png", "haier-fridge.png", "bosch-washer.png", "philips-blender.png"],
        clothes: ["nike-af1.png", "adidas-hoodie.png", "levis-jeans.png"],
        sport: ["football.png", "yoga-mat.png", "dumbbells.png"]
    };

    var details = {
        "iPhone 15 Pro": {
            about: "iPhone 15 Pro телефони флагмани Apple аст. Камераи касбӣ, чипи A17 Pro ва корпуси титанӣ онро барои сурат, видео ва кори ҳаррӯза хеле қавӣ мекунад. Батарея тамоми рӯз давом мекунад ва Face ID зуд кушода мешавад.",
            brand: "Apple",
            sku: "APL-IP15P",
            color: "Titanium",
            memory: "256 GB",
            warranty: "12 моҳ",
            delivery: "1–2 рӯз дар Душанбе, 2–4 рӯз дар дигар шаҳрҳо",
            stock: "Дар анбор — 14 адад",
            specs: [
                ["Экран", "6.1\" Super Retina XDR"],
                ["Протсессор", "A17 Pro"],
                ["Камера", "48 MP + 12 MP + 12 MP"],
                ["Батарея", "То 23 соат видео"],
                ["Обмен", "USB-C"]
            ]
        },
        "MacBook Pro": {
            about: "MacBook Pro барои кор, таҳсил ва эҷод сохта шудааст. Экран равшан аст, клавиатура қулай ва батарея дарозмуддат. Барои барномаҳои вазнин, видеомонтаж ва барномасозӣ мувофиқ аст.",
            brand: "Apple",
            sku: "APL-MBP14",
            color: "Space Gray",
            memory: "512 GB SSD",
            warranty: "12 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 7 адад",
            specs: [
                ["Экран", "14\" Liquid Retina XDR"],
                ["Чип", "Apple M3"],
                ["RAM", "16 GB"],
                ["Вазн", "1.55 кг"],
                ["Портҳо", "Thunderbolt / HDMI"]
            ]
        },
        "AirPods Pro": {
            about: "AirPods Pro гӯшмонаки бесим бо беҳдошти садои фаъол аст. Барои мусиқӣ, телефон ва варзиш қулай. Дар гӯш маҳкам меистад ва садои берунаро кам мекунад.",
            brand: "Apple",
            sku: "APL-APP2",
            color: "White",
            memory: "—",
            warranty: "12 моҳ",
            delivery: "Ҳамон рӯз дар Душанбе",
            stock: "Дар анбор — 32 адад",
            specs: [
                ["Навъ", "In-ear, бесим"],
                ["ANC", "Фъол"],
                ["Вақти кор", "То 6 соат"],
                ["Кейс", "USB-C"],
                ["Муҳофизат", "IPX4"]
            ]
        },
        "Apple Watch": {
            about: "Apple Watch набз, қадам ва хобро месанҷад. Огоҳиҳоро дар даст мебинед ва машқҳоро сабт мекунед. Барои саломатӣ ва ҳаёти фаъол хеле муфид аст.",
            brand: "Apple",
            sku: "APL-AW9",
            color: "Midnight",
            memory: "64 GB",
            warranty: "12 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 11 адад",
            specs: [
                ["Андоза", "45 mm"],
                ["Экран", "Always-On Retina"],
                ["GPS", "Ҳа"],
                ["Об", "То 50 м"],
                ["Батарея", "То 18 соат"]
            ]
        },
        "Smart TV": {
            about: "Телевизори смарт бо экрани калон ва интернети дарунсохт. Филм, YouTube ва барномаҳои телевизиониро бе приставка тамошо мекунед. Тасвир равшан ва садо қавӣ аст.",
            brand: "ORIVO Select",
            sku: "TV-SMART55",
            color: "Black",
            memory: "—",
            warranty: "24 моҳ",
            delivery: "2–5 рӯз, насб имконпазир",
            stock: "Дар анбор — 5 адад",
            specs: [
                ["Андоза", "55 дюйм"],
                ["Ҳал", "4K UHD"],
                ["Smart", "Android TV"],
                ["HDMI", "3 порт"],
                ["Садо", "Dolby Audio"]
            ]
        },
        "Samsung Galaxy S24": {
            about: "Galaxy S24 телефони қавии Samsung аст. Камераи хуб, экрани равшан ва батареяи дарозмуддат дорад. Барои сурат, кор ва бозӣ мувофиқ аст.",
            brand: "Samsung",
            sku: "SMS-S24",
            color: "Onyx Black",
            memory: "256 GB",
            warranty: "12 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 9 адад",
            specs: [
                ["Экран", "6.2\" Dynamic AMOLED"],
                ["Камера", "50 MP"],
                ["Батарея", "4000 mAh"],
                ["5G", "Ҳа"],
                ["AI", "Galaxy AI"]
            ]
        },
        "Xiaomi 14": {
            about: "Xiaomi 14 флагмани дастрас аст: камераи Leica, зарядкаи зуд ва кори ҳамвор. Барои онҳое, ки сифати баландро бо нархи оқилона мехоҳанд.",
            brand: "Xiaomi",
            sku: "MI-14",
            color: "White",
            memory: "256 GB",
            warranty: "12 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 18 адад",
            specs: [
                ["Экран", "6.36\" AMOLED"],
                ["Камера", "Leica 50 MP"],
                ["Заряд", "90W"],
                ["Чип", "Snapdragon 8 Gen 3"],
                ["Вазн", "193 г"]
            ]
        },
        "HP Pavilion": {
            about: "HP Pavilion ноутбуки боэътимод барои кор, таҳсил ва интернет аст. Экран калон, клавиатура қулай ва барои Word, Excel ва видеоколлҳо кифоя аст.",
            brand: "HP",
            sku: "HP-PAV15",
            color: "Silver",
            memory: "512 GB SSD",
            warranty: "12 моҳ",
            delivery: "2–4 рӯз",
            stock: "Дар анбор — 6 адад",
            specs: [
                ["Экран", "15.6\" Full HD"],
                ["CPU", "Intel Core i5"],
                ["RAM", "16 GB"],
                ["GPU", "Intel Iris"],
                ["Windows", "11"]
            ]
        },
        "ASUS VivoBook": {
            about: "ASUS VivoBook сабук ва зебо аст. Барои донишҷӯён ва кормандоне, ки ноутбуки сабукро ҳар рӯз мебаранд, интихоби хуб аст.",
            brand: "ASUS",
            sku: "AS-VB15",
            color: "Quiet Blue",
            memory: "512 GB SSD",
            warranty: "12 моҳ",
            delivery: "2–4 рӯз",
            stock: "Дар анбор — 8 адад",
            specs: [
                ["Экран", "15.6\" FHD"],
                ["CPU", "Ryzen 5"],
                ["RAM", "16 GB"],
                ["Вазн", "1.7 кг"],
                ["Порт", "USB-C / HDMI"]
            ]
        },
        "Sony WH-1000XM5": {
            about: "Sony WH-1000XM5 яке аз беҳтарин гӯшмонакҳои бозор аст. Садои тоза, ANC қавӣ ва бароҳатии дарозмуддат. Барои сафар ва кор дар ҷойҳои серғавғо аъло аст.",
            brand: "Sony",
            sku: "SNY-XM5",
            color: "Black",
            memory: "—",
            warranty: "12 моҳ",
            delivery: "1–2 рӯз",
            stock: "Дар анбор — 10 адад",
            specs: [
                ["Навъ", "Over-ear"],
                ["ANC", "Industry-leading"],
                ["Вақти кор", "30 соат"],
                ["Bluetooth", "5.2"],
                ["Микрофон", "8 адад"]
            ]
        },
        "JBL Tune 760": {
            about: "JBL Tune 760 гӯшмонаки сабук бо садои қавии JBL аст. Барои мусиқӣ, подкаст ва роҳ ҳар рӯз қулай ва дастрас аст.",
            brand: "JBL",
            sku: "JBL-T760",
            color: "Blue",
            memory: "—",
            warranty: "12 моҳ",
            delivery: "Ҳамон рӯз / 1 рӯз",
            stock: "Дар анбор — 24 адад",
            specs: [
                ["Навъ", "Over-ear"],
                ["ANC", "Ҳа"],
                ["Вақти кор", "35 соат"],
                ["Кабел", "3.5 mm"],
                ["Печондан", "Шавад"]
            ]
        },
        "Samsung Watch 6": {
            about: "Samsung Watch 6 соати ҳушманд бо санҷиши саломатӣ, GPS ва огоҳиҳои телефон аст. Ба Galaxy хуб пайваст мешавад ва машқҳоро дақиқ мешуморад.",
            brand: "Samsung",
            sku: "SMS-W6",
            color: "Graphite",
            memory: "16 GB",
            warranty: "12 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 13 адад",
            specs: [
                ["Андоза", "44 mm"],
                ["Экран", "Super AMOLED"],
                ["Wear OS", "Ҳа"],
                ["Батарея", "То 40 соат"],
                ["Об", "5 ATM"]
            ]
        },
        "Samsung 55 QLED": {
            about: "Samsung 55 QLED тасвири равшан ва рангҳои зинда медиҳад. Барои кино, варзиш ва бозиҳои консолӣ мувофиқ аст. Smart Hub барномаҳоро осон мекушояд.",
            brand: "Samsung",
            sku: "SMS-Q55",
            color: "Titan Gray",
            memory: "—",
            warranty: "24 моҳ",
            delivery: "2–5 рӯз",
            stock: "Дар анбор — 4 адад",
            specs: [
                ["Андоза", "55\""],
                ["Панел", "QLED 4K"],
                ["Hz", "120 Hz"],
                ["HDR", "HDR10+"],
                ["OS", "Tizen"]
            ]
        },
        "Dyson V15": {
            about: "Dyson V15 чангкашаки бесими қавӣ аст. Хокро аз фарш, қолин ва мебел зуд тоза мекунад. Барои хонаи калон ва оила хеле қулай аст.",
            brand: "Dyson",
            sku: "DYS-V15",
            color: "Yellow / Nickel",
            memory: "—",
            warranty: "24 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 6 адад",
            specs: [
                ["Навъ", "Бесим, вертикалӣ"],
                ["Қувва", "240 AW"],
                ["Вақти кор", "То 60 дақ"],
                ["Фильтр", "HEPA"],
                ["Вазн", "2.2 кг"]
            ]
        },
        "Яхдон Haier": {
            about: "Яхдони Haier ғизоро тоза ва хунук нигоҳ медорад. Ҳаҷми калон, сарфаи барқ ва кори ором. Барои оилаи 3–5 нафар мувофиқ аст.",
            brand: "Haier",
            sku: "HAI-RF320",
            color: "Inox",
            memory: "—",
            warranty: "24 моҳ",
            delivery: "3–6 рӯз, то дари хона",
            stock: "Дар анбор — 3 адад",
            specs: [
                ["Ҳаҷм", "320 л"],
                ["Навъ", "No Frost"],
                ["Класс", "A++"],
                ["Садо", "39 дБ"],
                ["Рафҳо", "Шиша"]
            ]
        },
        "Мошини ҷомашӯӣ Bosch": {
            about: "Мошини ҷомашӯии Bosch либосро нарм ва тоза мешӯяд. Барномаҳои зиёд, сарфаи об ва кори ором. Барои истифодаи ҳаррӯза боэътимод аст.",
            brand: "Bosch",
            sku: "BSH-W9",
            color: "White",
            memory: "—",
            warranty: "24 моҳ",
            delivery: "3–6 рӯз",
            stock: "Дар анбор — 5 адад",
            specs: [
                ["Бор", "9 кг"],
                ["Суръат", "1400 rpm"],
                ["Барнома", "15"],
                ["Энергия", "A+++"],
                ["Намоиш", "LED"]
            ]
        },
        "Блендер Philips": {
            about: "Блендери Philips барои смӯзӣ, шӯрбо ва соусҳо қулай аст. Мотор қавӣ, ҷоми шишагӣ ва шустани осон. Дар ошхона ҷои зиёд намегирад.",
            brand: "Philips",
            sku: "PH-BL600",
            color: "Black",
            memory: "—",
            warranty: "12 моҳ",
            delivery: "1–2 рӯз",
            stock: "Дар анбор — 21 адад",
            specs: [
                ["Қувва", "600 W"],
                ["Ҷом", "1.5 л шиша"],
                ["Суръат", "2 + Pulse"],
                ["Теғ", "Stainless"],
                ["Кабел", "1.2 м"]
            ]
        },
        "Nike Air Force 1": {
            about: "Nike Air Force 1 кефи классикӣ ва бароҳат аст. Ба пой хуб мешинад ва ҳам ба варзиш, ҳам ба либоси ҳаррӯза мувофиқ аст. Сифати аслӣ ва намуди зебо.",
            brand: "Nike",
            sku: "NK-AF1",
            color: "White",
            memory: "Андоза 40–45",
            warranty: "30 рӯз бозгашт",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 16 ҷуфт",
            specs: [
                ["Мавод", "Чарм"],
                ["Пошна", "Air"],
                ["Навъ", "Low"],
                ["Ҷинс", "Unisex"],
                ["Нигоҳдорӣ", "Пок кардан осон"]
            ]
        },
        "Adidas Hoodie": {
            about: "Ҳудӣ Adidas гарм, мулоим ва барои ҳар рӯз аст. Ба варзишгоҳ, роҳ ва хона мувофиқ. Дӯхти тоза ва логотипи маълум.",
            brand: "Adidas",
            sku: "AD-HD",
            color: "Black",
            memory: "S–XXL",
            warranty: "14 рӯз иваз",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 20 адад",
            specs: [
                ["Матоъ", "Пахта / полиэстер"],
                ["Навъ", "Oversize"],
                ["Ҷайб", "Кенгуру"],
                ["Шустан", "30°C"],
                ["Мавсим", "Тирамоҳ / зимистон"]
            ]
        },
        "Ҷинс Levi's": {
            about: "Ҷинси Levi's дӯхти классикӣ ва пойдор аст. Шакли хуб медиҳад ва солҳо истифода мешавад. Барои кор, таҳсил ва сайругашт мувофиқ.",
            brand: "Levi's",
            sku: "LV-511",
            color: "Indigo",
            memory: "28–36",
            warranty: "14 рӯз иваз",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 15 адад",
            specs: [
                ["Буриш", "Slim / 511"],
                ["Матоъ", "Denim 98/2"],
                ["Ҷайб", "5"],
                ["Аслӣ", "Levi's"],
                ["Нигоҳдорӣ", "Напечонед"]
            ]
        },
        "Тӯби футбол": {
            about: "Тӯби футбол барои майдон ва ҳавлии хона. Дӯхти мустаҳкам, паридани хуб ва барои машқ ё бозии дӯстона мувофиқ.",
            brand: "ORIVO Sport",
            sku: "SP-FB5",
            color: "White / Orange",
            memory: "Size 5",
            warranty: "30 рӯз",
            delivery: "1–2 рӯз",
            stock: "Дар анбор — 40 адад",
            specs: [
                ["Андоза", "5"],
                ["Мавод", "PU"],
                ["Дӯхт", "Machine stitched"],
                ["Вазн", "410–450 г"],
                ["Истифода", "Хокӣ / алаф"]
            ]
        },
        "Гилемчаи йога": {
            about: "Гилемчаи йога ғафс ва лағжиш нест. Барои йога, машқи хона ва дарозкунии бадан қулай. Ба осонӣ печонида мешавад.",
            brand: "ORIVO Fit",
            sku: "SP-YG",
            color: "Orange",
            memory: "183 x 61 см",
            warranty: "30 рӯз",
            delivery: "1–2 рӯз",
            stock: "Дар анбор — 27 адад",
            specs: [
                ["Ғафсӣ", "6 мм"],
                ["Мавод", "NBR"],
                ["Лағжиш", "Не"],
                ["Вазн", "0.9 кг"],
                ["Тозакунӣ", "Матои нам"]
            ]
        },
        "Гантеля 10 кг": {
            about: "Гантеляи 10 кг барои машқи даст, шона ва қафо. Маводи мустаҳкам, дастаи қулай. Барои хона ва толори хурд мувофиқ.",
            brand: "ORIVO Fit",
            sku: "SP-DB10",
            color: "Black",
            memory: "10 кг",
            warranty: "6 моҳ",
            delivery: "1–3 рӯз",
            stock: "Дар анбор — 12 ҷуфт",
            specs: [
                ["Вазн", "10 кг"],
                ["Навъ", "Яклӯхта"],
                ["Даста", "Резинӣ"],
                ["Машқ", "Strength"],
                ["Ҷуфт", "Фурӯш ҷуфтӣ"]
            ]
        }
    };

    function unique(list) {
        var seen = {};
        var out = [];
        list.forEach(function (item) {
            if (item && !seen[item]) {
                seen[item] = true;
                out.push(item);
            }
        });
        return out;
    }

    function get(product) {
        if (!product || !product.name) {
            return null;
        }

        var extra = details[product.name] || {
            about: "Ин маҳсулот дар ORIVO бо кафолат ва расонидани зуд пешниҳод мешавад. Сифат санҷида шудааст ва пардохт ҳангоми гирифтан имконпазир аст.",
            brand: "ORIVO",
            sku: "ORV-001",
            color: "Стандарт",
            memory: "—",
            warranty: "12 моҳ",
            delivery: "1–4 рӯз дар Тоҷикистон",
            stock: "Дар анбор",
            specs: [
                ["Категория", product.category || "Умумӣ"],
                ["Фурӯшанда", "ORIVO Official"],
                ["Кафолат", "12 моҳ"]
            ]
        };

        var gallery = unique(
            [product.image].concat(byCategory[product.category] || [])
        );

        return Object.assign({}, extra, {
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            gallery: gallery
        });
    }

    var imageIndex = {
        "phone.png": { name: "iPhone 15 Pro", price: "12000", category: "phone" },
        "samsung-s24.png": { name: "Samsung Galaxy S24", price: "9800", category: "phone" },
        "xiaomi-14.png": { name: "Xiaomi 14", price: "6500", category: "phone" },
        "laptop.png": { name: "MacBook Pro", price: "22000", category: "laptop" },
        "hp-pavilion.png": { name: "HP Pavilion", price: "14500", category: "laptop" },
        "asus-vivobook.png": { name: "ASUS VivoBook", price: "11800", category: "laptop" },
        "headphones.png": { name: "AirPods Pro", price: "3200", category: "headphones" },
        "sony-xm5.png": { name: "Sony WH-1000XM5", price: "4200", category: "headphones" },
        "jbl-tune.png": { name: "JBL Tune 760", price: "890", category: "headphones" },
        "watch.png": { name: "Apple Watch", price: "4500", category: "watch" },
        "samsung-watch6.png": { name: "Samsung Watch 6", price: "3100", category: "watch" },
        "tv.png": { name: "Smart TV", price: "7500", category: "tv" },
        "samsung-qled.png": { name: "Samsung 55 QLED", price: "9800", category: "tv" },
        "dyson-v15.png": { name: "Dyson V15", price: "4500", category: "home" },
        "haier-fridge.png": { name: "Яхдон Haier", price: "7200", category: "home" },
        "bosch-washer.png": { name: "Мошини ҷомашӯӣ Bosch", price: "8900", category: "home" },
        "philips-blender.png": { name: "Блендер Philips", price: "420", category: "home" },
        "nike-af1.png": { name: "Nike Air Force 1", price: "1450", category: "clothes" },
        "adidas-hoodie.png": { name: "Adidas Hoodie", price: "380", category: "clothes" },
        "levis-jeans.png": { name: "Ҷинс Levi's", price: "520", category: "clothes" },
        "football.png": { name: "Тӯби футбол", price: "180", category: "sport" },
        "yoga-mat.png": { name: "Гилемчаи йога", price: "95", category: "sport" },
        "dumbbells.png": { name: "Гантеля 10 кг", price: "240", category: "sport" }
    };

    return { get: get, details: details, byCategory: byCategory, imageIndex: imageIndex };
})();
