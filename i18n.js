/* ==================================================
   ORIVO SETTINGS + LANGUAGES
   Additive layer. Does not change app logic.
================================================== */

(function () {

    var LANG_KEY = "orivoLang";
    var THEME_KEY = "orivoTheme";

    var translating = false;

    var phrases = [
        ["🔍 Ҷустуҷӯи маҳсулот...", "🔍 Поиск товаров...", "🔍 Search products..."],
        ["Ҷустуҷӯи маҳсулот...", "Поиск товаров...", "Search products..."],
        ["Категорияҳо", "Категории", "Categories"],
        ["Категорияҳои машҳур", "Популярные категории", "Popular categories"],
        ["Маҳсулотҳои пешниҳодшуда", "Рекомендуемые товары", "Featured products"],
        ["Филтрҳо", "Фильтры", "Filters"],
        ["Пешниҳодшуда", "Рекомендуемые", "Featured"],
        ["Нарх: арзон → қимат", "Цена: дешёвые → дорогие", "Price: low to high"],
        ["Нарх: қимат → арзон", "Цена: дорогие → дешёвые", "Price: high to low"],
        ["Ба сабад", "В корзину", "Add to cart"],
        ["Ҳозир харидан", "Купить сейчас", "Buy now"],
        ["🔍 Ҷустуҷӯи фармоиш...", "🔍 Поиск заказа...", "🔍 Search orders..."],
        ["🔍 Ҷустуҷӯ...", "🔍 Поиск...", "🔍 Search..."],
        ["Тағйири режим", "Смена темы", "Change theme"],
        ["Ба дӯстдоштаҳо", "В избранное", "Add to wishlist"],
        ["Сабад", "Корзина", "Cart"],
        ["🌐 Забонҳои барнома", "🌐 Языки приложения", "🌐 App languages"],
        ["Забони асосӣ", "Основной язык", "Default language"],
        ["👤 Login", "👤 Войти", "👤 Login"],
        ["Танзимот", "Настройки", "Settings"],
        ["Забонҳои барнома", "Языки приложения", "App languages"],
        ["Забонро интихоб кунед", "Выберите язык", "Choose a language"],
        ["Намуди барнома", "Оформление", "Appearance"],
        ["Режими рӯшноӣ", "Светлая тема", "Light mode"],
        ["Режими торик", "Тёмная тема", "Dark mode"],
        ["Забон", "Язык", "Language"],
        ["Тоҷикӣ", "Таджикский", "Tajik"],
        ["Русӣ", "Русский", "Russian"],
        ["Англисӣ", "Английский", "English"],
        ["Ба мағоза баргаштан", "Вернуться в магазин", "Back to store"],
        ["Танзимот захира шуд", "Настройки сохранены", "Settings saved"],
        ["Интихоби забон ва намуди барнома", "Язык и оформление приложения", "Language and appearance"],
        ["Хуш омадед ба", "Добро пожаловать в", "Welcome to"],
        ["Беҳтарин маҳсулотро осон, зуд ва бехатар харед.", "Покупайте лучшие товары легко, быстро и безопасно.", "Buy the best products easily, quickly and safely."],
        ["🛒 Харидро оғоз кунед", "🛒 Начать покупки", "🛒 Start shopping"],
        ["Расонидани зуд", "Быстрая доставка", "Fast delivery"],
        ["Маҳсулотро зуд қабул кунед", "Получайте товары быстро", "Receive products quickly"],
        ["Пардохти бехатар", "Безопасная оплата", "Secure payment"],
        ["Хариди боэътимод ва бехатар", "Надёжная и безопасная покупка", "Reliable and secure shopping"],
        ["Бозгардонидани осон", "Лёгкий возврат", "Easy returns"],
        ["Хизматрасонии қулай", "Удобный сервис", "Convenient service"],
        ["ORIVO Тоҷикистон", "ORIVO Таджикистан", "ORIVO Tajikistan"],
        ["Marketplace барои Тоҷикистон", "Маркетплейс для Таджикистана", "Marketplace for Tajikistan"],
        ["Тоҷикистон", "Таджикистан", "Tajikistan"],
        ["📂 Категорияҳо", "📂 Категории", "📂 Categories"],
        ["Категорияи маҳсулоти лозимаро интихоб кунед", "Выберите нужную категорию товаров", "Choose the product category you need"],
        ["🛍 Ҳама", "🛍 Все", "🛍 All"],
        ["📱 Телефон", "📱 Телефон", "📱 Phone"],
        ["💻 Ноутбук", "💻 Ноутбук", "💻 Laptop"],
        ["🎧 Гӯшмонак", "🎧 Наушники", "🎧 Headphones"],
        ["⌚ Соат", "⌚ Часы", "⌚ Watch"],
        ["📺 Телевизор", "📺 Телевизор", "📺 TV"],
        ["🏠 Хона", "🏠 Дом", "🏠 Home"],
        ["👕 Либос", "👕 Одежда", "👕 Clothes"],
        ["⚽ Варзиш", "⚽ Спорт", "⚽ Sport"],
        ["📦 Маҳсулотҳо", "📦 Товары", "📦 Products"],
        ["Маҳсулоти беҳтарини ORIVO", "Лучшие товары ORIVO", "Best ORIVO products"],
        ["🆕 Нав", "🆕 Новое", "🆕 New"],
        ["🛒 Ба сабад", "🛒 В корзину", "🛒 Add to cart"],
        ["🛒 Сабади харид", "🛒 Корзина", "🛒 Shopping cart"],
        ["Маҳсулотҳои интихобкардаи шумо", "Выбранные вами товары", "Your selected products"],
        ["Сабад холӣ аст", "Корзина пуста", "Cart is empty"],
        ["Маҳсулотро ба сабад илова кунед.", "Добавьте товары в корзину.", "Add products to the cart."],
        ["Аввал маҳсулотро ба сабад илова кунед.", "Сначала добавьте товары в корзину.", "Add products to the cart first."],
        ["Аввал маҳсулотро ба сабад", "Сначала добавьте товары в корзину", "First add products to the cart"],
        ["илова кунед.", "и нажмите далее.", "then continue."],
        ["💰 Ҳамагӣ:", "💰 Итого:", "💰 Total:"],
        ["✅ Ба фармоиш", "✅ К оформлению", "✅ Checkout"],
        ["← Ба мағоза", "← В магазин", "← Back to store"],
        ["🔐 Воридшавӣ", "🔐 Вход", "🔐 Sign in"],
        ["Воридшавӣ", "Вход", "Sign in"],
        ["Воридшавӣ | ORIVO", "Вход | ORIVO", "Sign in | ORIVO"],
        ["Ба аккаунти худ ворид шавед.", "Войдите в свой аккаунт.", "Sign in to your account."],
        ["🔐 Ворид шудан", "🔐 Войти", "🔐 Sign in"],
        ["Ворид шудан", "Войти", "Sign in"],
        ["Аккаунт надоред?", "Нет аккаунта?", "Don't have an account?"],
        ["📝 Сабти ном", "📝 Регистрация", "📝 Register"],
        ["Сабти ном", "Регистрация", "Register"],
        ["Сабти ном | ORIVO", "Регистрация | ORIVO", "Register | ORIVO"],
        ["Аккаунти нави худро созед.", "Создайте новый аккаунт.", "Create your new account."],
        ["👤 Номи шумо", "👤 Ваше имя", "👤 Your name"],
        ["Парол", "Пароль", "Password"],
        ["Такрори парол", "Повтор пароля", "Repeat password"],
        ["Ҳисоби шахсӣ", "Личный кабинет", "Your account"],
        ["Ҳисоби нав", "Новый аккаунт", "New account"],
        ["Камаш 6 аломат", "Минимум 6 символов", "At least 6 characters"],
        ["Паролро такрор кунед", "Повторите пароль", "Repeat the password"],
        ["🔑 Парол", "🔑 Пароль", "🔑 Password"],
        ["🔑 Такрори парол", "🔑 Повтор пароля", "🔑 Repeat password"],
        ["Аллакай аккаунт доред?", "Уже есть аккаунт?", "Already have an account?"],
        ["Маҳсулоти босифат бо нархи дастрас.", "Качественный товар по доступной цене.", "Quality product at an affordable price."],
        ["⭐ Рейтинг", "⭐ Рейтинг", "⭐ Rating"],
        ["Рейтинг интихоб нашудааст", "Рейтинг не выбран", "Rating is not selected"],
        ["💬 Шарҳ нависед", "💬 Напишите отзыв", "💬 Write a review"],
        ["Шарҳи худро нависед...", "Напишите свой отзыв...", "Write your review..."],
        ["💬 Илова кардани шарҳ", "💬 Добавить отзыв", "💬 Add review"],
        ["💬 Шарҳҳои харидорон", "💬 Отзывы покупателей", "💬 Customer reviews"],
        ["Номи шумо", "Ваше имя", "Your name"],
        ["🎉 Фармоиш қабул шуд!", "🎉 Заказ принят!", "🎉 Order received!"],
        ["✅ Ташаккур барои харид!", "✅ Спасибо за покупку!", "✅ Thank you for your purchase!"],
        ["Фармоиши шумо ба администратор фиристода шуд.", "Ваш заказ отправлен администратору.", "Your order was sent to the administrator."],
        ["🛍 Ба мағоза баргаштан", "🛍 Вернуться в магазин", "🛍 Back to the store"],
        ["🧾 Фармоишҳоро дидан", "🧾 Смотреть заказы", "🧾 View orders"],
        ["Фармоиш қабул шуд", "Заказ принят", "Order received"],
        ["Маҳсулотҳои дӯстдоштаи худро дар як ҷо нигоҳ доред.", "Храните любимые товары в одном месте.", "Keep your favorite products in one place."],
        ["❤️ Маҳсулотҳои дӯстдошта", "❤️ Избранные товары", "❤️ Favorite products"],
        ["Wishlist холӣ аст", "Список желаний пуст", "Wishlist is empty"],
        ["Маҳсулот ёфт нашуд", "Товар не найден", "Product not found"],
        ["Маҳсулотҳои дӯстдоштаатонро аз Marketplace интихоб кунед.", "Выберите любимые товары в Marketplace.", "Choose your favorite products from the Marketplace."],
        ["Номи дигар маҳсулотро ҷустуҷӯ кунед.", "Поищите другое название товара.", "Search for another product name."],
        ["Хориҷ кардан", "Удалить", "Remove"],
        ["💔 Хориҷ кардан", "💔 Удалить", "💔 Remove"],
        ["❤️ Ҳоло маҳсулоти дӯстдошта нест.", "❤️ Пока нет избранных товаров.", "❤️ No favorite products yet."],
        ["Ба мағоза баргардед ва маҳсулотро ❤️ кунед.", "Вернитесь в магазин и добавьте товары в ❤️.", "Go back to the store and heart a product."],
        ["Ба мағоза баргардед ва", "Вернитесь в магазин и", "Go back to the store and"],
        ["маҳсулотро ❤️ кунед.", "добавьте товары в ❤️.", "add products to ❤️."],
        ["Оформление заказа", "Оформление заказа", "Checkout"],
        ["Маълумоти худро ворид кунед ва фармоишро тасдиқ намоед.", "Введите свои данные и подтвердите заказ.", "Enter your details and confirm the order."],
        ["Ташаккур барои харид аз ORIVO.", "Спасибо за покупку в ORIVO.", "Thank you for shopping at ORIVO."],
        ["Фармоиши шумо бо муваффақият қабул гардид.", "Ваш заказ успешно принят.", "Your order was successfully received."],
        ["🏠 Ба Marketplace", "🏠 На Marketplace", "🏠 To Marketplace"],
        ["📦 Маҳсулотҳои шумо", "📦 Ваши товары", "📦 Your products"],
        ["👤 Маълумоти харидор", "👤 Данные покупателя", "👤 Buyer details"],
        ["Номи пурра", "Полное имя", "Full name"],
        ["Номи пурраи шумо", "Ваше полное имя", "Your full name"],
        ["📞 Рақами телефон", "📞 Номер телефона", "📞 Phone number"],
        ["🏙 Шаҳр", "🏙 Город", "🏙 City"],
        ["Шаҳрро интихоб кунед", "Выберите город", "Select a city"],
        ["📍 Суроға", "📍 Адрес", "📍 Address"],
        ["Суроғаи пурраи худро нависед...", "Напишите полный адрес...", "Enter your full address..."],
        ["📝 Шарҳ", "📝 Комментарий", "📝 Comment"],
        ["Шарҳи иловагӣ...", "Дополнительный комментарий...", "Additional comment..."],
        ["💳 Тарзи пардохт", "💳 Способ оплаты", "💳 Payment method"],
        ["💵 Пардохт ҳангоми гирифтани мол", "💵 Оплата при получении", "💵 Cash on delivery"],
        ["💳 Корти бонкӣ", "💳 Банковская карта", "💳 Bank card"],
        ["🌐 Пардохти онлайн", "🌐 Онлайн-оплата", "🌐 Online payment"],
        ["🧾 Хулосаи фармоиш", "🧾 Итог заказа", "🧾 Order summary"],
        ["Маблағи маҳсулот", "Сумма товаров", "Products total"],
        ["Расонидан", "Доставка", "Delivery"],
        ["✅ Фармоиш додан", "✅ Оформить заказ", "✅ Place order"],
        ["🛍 Ба Marketplace", "🛍 На Marketplace", "🛍 To Marketplace"],
        ["Фармоишҳои ман", "Мои заказы", "My orders"],
        ["Ҳамаи фармоишҳои шумо дар як ҷо.", "Все ваши заказы в одном месте.", "All your orders in one place."],
        ["🗑️ Тоза кардани ҳама", "🗑️ Очистить всё", "🗑️ Clear all"],
        ["Ҳоло ягон фармоиш нишон дода намешавад.", "Сейчас заказы не отображаются.", "No orders are shown right now."],
        ["🟢 Қабул шуд", "🟢 Принят", "🟢 Received"],
        ["👤 Харидор", "👤 Покупатель", "👤 Buyer"],
        ["Маҳсулот нест.", "Товаров нет.", "No products."],
        ["Маҳсулот нест", "Товаров нет", "No products"],
        ["Пардохт:", "Оплата:", "Payment:"],
        ["Нест кардан", "Удалить", "Delete"],
        ["Ба панели админӣ ворид шавед", "Войдите в панель администратора", "Sign in to the admin panel"],
        ["Номи корбар", "Имя пользователя", "Username"],
        ["Парол", "Пароль", "Password"],
        ["📈 Омори фурӯш", "📈 Статистика продаж", "📈 Sales statistics"],
        ["💰 Фурӯши умумӣ", "💰 Общие продажи", "💰 Total sales"],
        ["📊 Графики фурӯш", "📊 График продаж", "📊 Sales chart"],
        ["📦 Маҳсулот", "📦 Товары", "📦 Products"],
        ["🧾 Фармоишҳо", "🧾 Заказы", "🧾 Orders"],
        ["📈 Фурӯш", "📈 Продажи", "📈 Sales"],
        ["🛍 Мағоза", "🛍 Магазин", "🛍 Store"],
        ["⚡ Амалҳои зуд", "⚡ Быстрые действия", "⚡ Quick actions"],
        ["➕ Илова кардани маҳсулот", "➕ Добавить товар", "➕ Add product"],
        ["🧾 Дидани фармоишҳо", "🧾 Смотреть заказы", "🧾 View orders"],
        ["📈 Графики фурӯш", "📈 График продаж", "📈 Sales chart"],
        ["🛍 Ба мағоза", "🛍 В магазин", "🛍 To the store"],
        ["🧾 Фармоишҳои охирин", "🧾 Последние заказы", "🧾 Recent orders"],
        ["📭 Ҳоло фармоиш нест.", "📭 Пока заказов нет.", "📭 No orders yet."],
        ["маҳсулот", "товаров", "products"],
        ["фармоиш", "заказов", "orders"],
        ["корбар", "пользователей", "users"],
        ["Корбарон", "Пользователи", "Users"],
        ["Фурӯш", "Продажи", "Sales"],
        ["Маҳсулот", "Товары", "Products"],
        ["Фармоишҳо", "Заказы", "Orders"],
        ["Мағоза", "Магазин", "Store"],
        ["🚪 Баромадан", "🚪 Выйти", "🚪 Log out"],
        ["Маҳсулоти Marketplace-ро идора кунед.", "Управляйте товарами Marketplace.", "Manage Marketplace products."],
        ["Ҳамаи маҳсулотҳо", "Все товары", "All products"],
        ["➕ Маҳсулоти нав", "➕ Новый товар", "➕ New product"],
        ["Ба ORIVO маҳсулоти нав илова кунед.", "Добавьте новый товар в ORIVO.", "Add a new product to ORIVO."],
        ["Номи маҳсулот", "Название товара", "Product name"],
        ["Тавсифи маҳсулот", "Описание товара", "Product description"],
        ["Тавсифи кӯтоҳи маҳсулот...", "Краткое описание товара...", "Short product description..."],
        ["✅ Илова кардани маҳсулот", "✅ Добавить товар", "✅ Add product"],
        ["Фармоишҳои муштариёнро идора кунед.", "Управляйте заказами клиентов.", "Manage customer orders."],
        ["Маблағ", "Сумма", "Amount"],
        ["✏️ Таҳрир", "✏️ Изменить", "✏️ Edit"],
        ["💾 Нигоҳ доштани тағйирот", "💾 Сохранить изменения", "💾 Save changes"],
        ["📦 Ҳоло маҳсулот нест.", "📦 Пока нет товаров.", "📦 No products yet."],
        ["Аввал маҳсулот илова кунед.", "Сначала добавьте товар.", "Add a product first."],
        ["сомонӣ", "сомони", "TJS"],
        ["Ҳамагӣ", "Итого", "Total"],
        ["Ҳама", "Все", "All"],
        ["Телефон", "Телефон", "Phone"],
        ["Ноутбук", "Ноутбук", "Laptop"],
        ["Гӯшмонак", "Наушники", "Headphones"],
        ["Соат", "Часы", "Watch"],
        ["Телевизор", "Телевизор", "TV"],
        ["Нав", "Новое", "New"],
        ["Харидор", "Покупатель", "Buyer"],
        ["Шаҳр", "Город", "City"],
        ["Суроға", "Адрес", "Address"],
        ["Шарҳ", "Комментарий", "Comment"],
        ["Душанбе", "Душанбе", "Dushanbe"],
        ["Хуҷанд", "Худжанд", "Khujand"],
        ["Бохтар", "Бохтар", "Bokhtar"],
        ["Кӯлоб", "Куляб", "Kulob"],
        ["Истаравшан", "Истаравшан", "Istaravshan"],
        ["Турсунзода", "Турсунзаде", "Tursunzoda"],
        ["ORIVO | Tajikistan Marketplace", "ORIVO | Маркетплейс Таджикистана", "ORIVO | Tajikistan Marketplace"],
        ["ORIVO | Фармоишҳо", "ORIVO | Заказы", "ORIVO | Orders"],
        ["Login - Marketplace", "Вход - Marketplace", "Login - Marketplace"],
        ["Register - Marketplace", "Регистрация - Marketplace", "Register - Marketplace"],
        ["Маҳсулот", "Товар", "Product"],
        ["Фурӯш", "Продажи", "Sales"],
        ["Фармоиш қабул шуд", "Заказ принят", "Order received"],
        ["🛒 Маҳсулот ба сабад илова шуд!", "🛒 Товар добавлен в корзину!", "🛒 Product added to cart!"],
        ["✅ Маҳсулот ба сабад илова шуд!", "✅ Товар добавлен в корзину!", "✅ Product added to cart!"],
        ["💔 Аз Wishlist хориҷ шуд!", "💔 Удалено из Wishlist!", "💔 Removed from Wishlist!"],
        ["🛒 Аввал маҳсулотро ба сабад илова кунед!", "🛒 Сначала добавьте товары в корзину!", "🛒 Add products to the cart first!"],
        ["🛒 Сабад холӣ аст!", "🛒 Корзина пуста!", "🛒 The cart is empty!"],
        ["❗ Email-ро нависед.", "❗ Введите Email.", "❗ Enter your Email."],
        ["❗ Паролро нависед.", "❗ Введите пароль.", "❗ Enter your password."],
        ["❌ Email ё парол нодуруст аст.", "❌ Неверный Email или пароль.", "❌ Incorrect Email or password."],
        ["❗ Лутфан номи худро нависед.", "❗ Пожалуйста, введите своё имя.", "❗ Please enter your name."],
        ["❗ Лутфан Email-ро нависед.", "❗ Пожалуйста, введите Email.", "❗ Please enter your Email."],
        ["❗ Email нодуруст аст.", "❗ Некорректный Email.", "❗ Invalid Email."],
        ["❗ Парол бояд камаш 6 аломат дошта бошад.", "❗ Пароль должен содержать минимум 6 символов.", "❗ Password must be at least 6 characters."],
        ["❗ Паролҳо якхел нестанд.", "❗ Пароли не совпадают.", "❗ Passwords do not match."],
        ["❌ Ин Email аллакай сабт шудааст.", "❌ Этот Email уже зарегистрирован.", "❌ This Email is already registered."],
        ["🎉 Аккаунт бо муваффақият сохта шуд!", "🎉 Аккаунт успешно создан!", "🎉 Account created successfully!"],
        ["❗ Номи худро нависед.", "❗ Введите своё имя.", "❗ Enter your name."],
        ["❗ Шарҳро нависед.", "❗ Напишите отзыв.", "❗ Write a review."],
        ["❗ Аввал рейтинг интихоб кунед.", "❗ Сначала выберите рейтинг.", "❗ Select a rating first."],
        ["✅ Шарҳи шумо илова шуд!", "✅ Ваш отзыв добавлен!", "✅ Your review was added!"],
        ["💬 Ҳоло шарҳ нест.", "💬 Пока нет отзывов.", "💬 No reviews yet."],
        ["✅ Хуш омадед, Admin!", "✅ Добро пожаловать, Admin!", "✅ Welcome, Admin!"],
        ["❌ Номи корбар ё парол нодуруст аст.", "❌ Неверное имя пользователя или пароль.", "❌ Incorrect username or password."],
        ["❌ Дастрасӣ манъ аст!\n\nАввал ба аккаунт ворид шавед.", "❌ Доступ запрещён!\n\nСначала войдите в аккаунт.", "❌ Access denied!\n\nPlease sign in first."],
        ["🚫 Дастрасӣ манъ аст!\n\nТанҳо Admin метавонад ин саҳифаро кушояд.", "🚫 Доступ запрещён!\n\nОткрыть эту страницу может только Admin.", "🚫 Access denied!\n\nOnly Admin can open this page."],
        ["❓ Мехоҳед аз Admin бароед?", "❓ Хотите выйти из Admin?", "❓ Do you want to leave Admin?"],
        ["👋 Шумо аз Admin баромадед.", "👋 Вы вышли из Admin.", "👋 You have left Admin."],
        ["❗ Номи маҳсулотро нависед.", "❗ Введите название товара.", "❗ Enter the product name."],
        ["❗ Нархро дуруст ворид кунед.", "❗ Введите корректную цену.", "❗ Enter a valid price."],
        ["❗ Номи файли суратро нависед.", "❗ Введите имя файла изображения.", "❗ Enter the image file name."],
        ["✅ Маҳсулот нав карда шуд.", "✅ Товар обновлён.", "✅ Product updated."],
        ["✅ Маҳсулот нав карда шуд!", "✅ Товар обновлён!", "✅ Product updated!"],
        ["🎉 Маҳсулот илова шуд.", "🎉 Товар добавлен.", "🎉 Product added."],
        ["✅ Маҳсулот илова шуд!", "✅ Товар добавлен!", "✅ Product added!"],
        ["🗑 Маҳсулот нест карда шуд.", "🗑 Товар удалён.", "🗑 Product deleted."],
        ["📭 Ҳоло фурӯш нест", "📭 Пока нет продаж", "📭 No sales yet"],
        ["Ҳоло фармоиш нест", "Пока заказов нет", "No orders yet"],
        ["🧾 Ҳоло ягон фармоиш нест.", "🧾 Пока заказов нет.", "🧾 There are no orders yet."],
        ["Оё мехоҳед ин фармоишро нест кунед?", "Удалить этот заказ?", "Do you want to delete this order?"],
        ["Оё мутмаин ҳастед, ки ҳамаи фармоишҳоро нест мекунед?", "Вы уверены, что хотите удалить все заказы?", "Are you sure you want to delete all orders?"],
        ["Оё мехоҳед аз Admin Panel бароед?", "Хотите выйти из Admin Panel?", "Do you want to leave the Admin Panel?"],
        ["Оё ин маҳсулотро нест мекунед?", "Удалить этот товар?", "Do you want to delete this product?"],
        ["0 сомонӣ", "0 сомони", "0 TJS"],
        [" сомонӣ", " сомони", " TJS"],
        ["Фармоишҳо: ", "Заказы: ", "Orders: "],
        ["Фармоишҳо: 0", "Заказы: 0", "Orders: 0"]
    ];

    phrases.sort(function (a, b) {
        return b[0].length - a[0].length;
    });

    var compactMap = {};

    phrases.forEach(function (item) {
        compactMap[compact(item[0])] = item;
    });

    var patterns = [
        {
            re: /^✅ Хуш омадед, (.+)!$/,
            ru: "✅ Добро пожаловать, $1!",
            en: "✅ Welcome, $1!"
        },
        {
            re: /^Оё маҳсулоти "(.+)"-ро нест мекунед\?$/,
            ru: "Удалить товар \"$1\"?",
            en: "Delete product \"$1\"?"
        }
    ];

    function compact(value) {
        return String(value || "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function getLang() {
        var lang = localStorage.getItem(LANG_KEY) || "tg";

        if (lang !== "tg" && lang !== "ru" && lang !== "en") {
            return "tg";
        }

        return lang;
    }

    function langIndex(lang) {
        if (lang === "ru") {
            return 1;
        }

        if (lang === "en") {
            return 2;
        }

        return 0;
    }

    function htmlLang(lang) {
        if (lang === "ru") {
            return "ru";
        }

        if (lang === "en") {
            return "en";
        }

        return "tg";
    }

    function translateText(text) {
        var lang = getLang();
        var source = String(text == null ? "" : text);

        if (lang === "tg" || source === "") {
            return source;
        }

        var index = langIndex(lang);
        var packed = compact(source);
        var exact = compactMap[packed];

        if (exact) {
            return exact[index];
        }

        var i;
        var match;

        for (i = 0; i < patterns.length; i += 1) {
            match = packed.match(patterns[i].re);

            if (match) {
                return packed.replace(
                    patterns[i].re,
                    patterns[i][lang]
                );
            }
        }

        var result = source;

        for (i = 0; i < phrases.length; i += 1) {
            if (result.indexOf(phrases[i][0]) !== -1) {
                result = result.split(phrases[i][0]).join(phrases[i][index]);
            }
        }

        return result;
    }

    function skipNode(node) {
        var parent = node.parentNode;

        if (!parent || !parent.closest) {
            return false;
        }

        return Boolean(
            parent.closest(
                "script, style, noscript, code, [contenteditable='true']"
            )
        );
    }

    function originalOf(target, key, current) {
        if (target[key] == null) {
            target[key] = current;
        }

        return target[key];
    }

    function refreshOriginal(target, key, current, translateFn) {
        var stored = target[key];

        if (stored == null) {
            target[key] = current;
            return current;
        }

        var translatedStored = translateFn(stored);

        if (
            current !== stored &&
            current !== translatedStored
        ) {
            target[key] = current;
            return current;
        }

        return stored;
    }

    function applyToTextNode(node) {
        if (skipNode(node)) {
            return;
        }

        var original = refreshOriginal(
            node,
            "_orivoI18n",
            node.nodeValue,
            translateText
        );

        var next = translateText(original);

        if (next !== node.nodeValue) {
            node.nodeValue = next;
        }
    }

    function applyToElement(element) {
        var attrs = [
            "placeholder",
            "title",
            "alt",
            "aria-label"
        ];

        var i;
        var name;
        var key;
        var original;
        var next;

        for (i = 0; i < attrs.length; i += 1) {
            name = attrs[i];

            if (!element.hasAttribute(name)) {
                continue;
            }

            key = "_orivoI18n_" + name;
            original = refreshOriginal(
                element,
                key,
                element.getAttribute(name),
                translateText
            );
            next = translateText(original);

            if (next !== element.getAttribute(name)) {
                element.setAttribute(name, next);
            }
        }

        if (element.tagName === "OPTION") {
            original = refreshOriginal(
                element,
                "_orivoI18nText",
                element.text,
                translateText
            );
            next = translateText(original);

            if (next !== element.text) {
                element.text = next;
            }
        }
    }

    function applyTranslations(root) {
        translating = true;

        var scope = root || document.body;

        if (!scope) {
            translating = false;
            return;
        }

        var walker = document.createTreeWalker(
            scope,
            NodeFilter.SHOW_TEXT,
            null
        );

        var node = walker.nextNode();

        while (node) {
            applyToTextNode(node);
            node = walker.nextNode();
        }

        var elements = scope.querySelectorAll
            ? scope.querySelectorAll(
                "[placeholder], [title], [alt], [aria-label], option"
            )
            : [];

        var i;

        for (i = 0; i < elements.length; i += 1) {
            applyToElement(elements[i]);
        }

        if (document.title) {
            document.title = translateText(
                originalOf(
                    document,
                    "_orivoI18nTitle",
                    document.title
                )
            );
        }

        translating = false;
    }

    function applyTheme() {
        if (!document.body) {
            return;
        }

        if (localStorage.getItem(THEME_KEY) === "dark") {
            document.body.classList.add("dark-mode");
        }
    }

    function injectSettingsButton() {
        if (document.getElementById("orivoSettingsLink")) {
            return;
        }

        var page = (window.location.pathname.split("/").pop() || "")
            .toLowerCase();

        if (page === "settings.html") {
            return;
        }

        var link = document.createElement("a");
        link.id = "orivoSettingsLink";
        link.href = "settings.html";
        link.className = "theme-button settings-button";
        link.setAttribute("title", "Танзимот");
        link.textContent = "⚙️";

        var themeButton = document.getElementById("themeButton");
        var menu = document.querySelector(".menu");
        var header = document.querySelector("header");

        if (themeButton && themeButton.parentNode) {
            themeButton.parentNode.insertBefore(link, themeButton);
        } else if (menu) {
            menu.appendChild(link);
        } else if (header) {
            header.appendChild(link);
        }

        if (
            window.OrivoAuth &&
            window.OrivoAuth.isOwner &&
            window.OrivoAuth.isOwner() &&
            !document.getElementById("orivoOwnerLink")
        ) {
            var ownerLink = document.createElement("a");
            ownerLink.id = "orivoOwnerLink";
            ownerLink.href = "admin.html";
            ownerLink.className = "header-link";
            ownerLink.textContent = "Панел";
            link.parentNode.insertBefore(ownerLink, link);
        }
    }

    function injectSupport() {
        if (document.getElementById("orivoSupportScript")) {
            return;
        }

        var page = (window.location.pathname.split("/").pop() || "")
            .toLowerCase();

        if (
            page === "dashboard.html" ||
            page === "admin.html" ||
            page === "admin-login.html" ||
            page === "sales.html"
        ) {
            return;
        }

        var script = document.createElement("script");
        script.id = "orivoSupportScript";
        script.src = "support.js";
        document.body.appendChild(script);
    }

    function setDocumentLang() {
        document.documentElement.lang = htmlLang(getLang());
    }

    function applyAll() {
        setDocumentLang();
        applyTheme();
        injectSettingsButton();
        injectSupport();
        applyTranslations(document.body);
    }

    function setLang(lang) {
        localStorage.setItem(LANG_KEY, lang);
        applyAll();
    }

    var nativeAlert = window.alert;
    var nativeConfirm = window.confirm;

    window.alert = function (message) {
        return nativeAlert.call(
            window,
            translateText(message)
        );
    };

    window.confirm = function (message) {
        return nativeConfirm.call(
            window,
            translateText(message)
        );
    };

    window.OrivoI18n = {
        getLang: getLang,
        setLang: setLang,
        apply: applyAll,
        t: translateText
    };

    function startObserver() {
        if (!document.body || typeof MutationObserver === "undefined") {
            return;
        }

        var observer = new MutationObserver(function (records) {
            if (translating) {
                return;
            }

            var i;
            var record;

            for (i = 0; i < records.length; i += 1) {
                record = records[i];

                if (record.type === "childList") {
                    record.addedNodes.forEach(function (added) {
                        if (added.nodeType === Node.TEXT_NODE) {
                            applyToTextNode(added);
                        } else if (added.nodeType === Node.ELEMENT_NODE) {
                            applyTranslations(added);
                        }
                    });
                }

                if (
                    record.type === "characterData" &&
                    record.target &&
                    record.target.nodeType === Node.TEXT_NODE
                ) {
                    applyToTextNode(record.target);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function boot() {
        applyAll();
        startObserver();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

})();
