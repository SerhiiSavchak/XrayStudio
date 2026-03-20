import type { Locale } from "./config";

export const translations = {
  uk: {
    nav: {
      services: "Послуги",
      work: "Роботи",
      about: "Про мене",
      contact: "Контакт",
    },
    hero: {
      label: "Веб-розробник",
      title: "Створюю сайти, які",
      titleHighlight: "продають",
      subtitle:
        "Premium веб-розробка для експертів, брендів та бізнесів, яким потрібна сильна цифрова присутність",
      cta: "Обговорити проєкт",
      ctaSecondary: "Переглянути роботи",
    },
    credibility: {
      experience: "років досвіду",
      projects: "проєктів",
      clients: "задоволених клієнтів",
    },
    services: {
      title: "Послуги",
      subtitle: "Що я створюю",
      design: {
        title: "Дизайн",
        description: "Візуальна концепція та UI/UX дизайн",
      },
      development: {
        title: "Розробка",
        description: "Технічна реалізація та програмування",
      },
      support: {
        title: "Підтримка",
        description: "Технічна підтримка та розвиток",
      },
      cta: "Усі послуги",
    },
    work: {
      title: "Роботи",
      subtitle: "Вибрані проєкти",
      viewCase: "Переглянути кейс",
      viewAll: "Усі роботи",
    },
    process: {
      title: "Процес",
      subtitle: "Як я працюю",
      steps: {
        discovery: {
          title: "Дослідження",
          description: "Аналіз задачі, цілей та аудиторії",
        },
        strategy: {
          title: "Стратегія",
          description: "Структура, контент та візуальний напрямок",
        },
        design: {
          title: "Дизайн",
          description: "Візуальна концепція та UI/UX",
        },
        development: {
          title: "Розробка",
          description: "Технічна реалізація",
        },
        launch: {
          title: "Запуск",
          description: "Тестування та публікація",
        },
      },
    },
    about: {
      title: "Про мене",
      subtitle: "Хто стоїть за цим",
      greeting: "Привіт, я Сергій",
      bio1: "Веб-розробник з 5+ роками досвіду у створенні сучасних, орієнтованих на конверсію веб-сайтів.",
      bio2: "Я спеціалізуюсь на допомозі експертам та бізнесам будувати сильну цифрову присутність, яка перетворює відвідувачів у клієнтів.",
      description:
        "Веб-розробник, який створює сайти як цільні digital-продукти — з продуманою структурою, сильною візуальною подачею та якісною реалізацією.",
      cta: "Дізнатися більше",
    },
    contact: {
      title: "Контакт",
      subtitle: "Давайте створимо щось разом",
      description:
        "Маєте проєкт? Напишіть мені, і ми обговоримо, як я можу допомогти.",
      form: {
        name: "Ваше ім'я",
        email: "Email",
        message: "Повідомлення",
        projectType: "Тип проєкту",
        budget: "Бюджет",
        submit: "Надіслати",
        sending: "Надсилання...",
        success: "Дякую! Я зв'яжусь з вами найближчим часом.",
      },
      cta: "Написати мені",
    },
    footer: {
      rights: "Усі права захищено",
      privacy: "Політика конфіденційності",
    },
    theme: {
      light: "Світла",
      dark: "Темна",
      system: "Системна",
    },
    cta: {
      primary: "Обговорити проєкт",
      secondary: "Переглянути роботи",
      contact: "Зв'язатися",
      learnMore: "Дізнатися більше",
      ready: "Готові?",
      title: "Давайте створимо щось разом",
      subtitle: "Маєте проєкт? Напишіть мені, і ми обговоримо, як я можу допомогти.",
      response: "Відповідь протягом 24 годин",
      discuss: "Обговорити проєкт",
      examples: "Переглянути приклади",
    },
    value: {
      title: "Цінності",
      subtitle: "Чому саме я",
      description: "Кожен проєкт — це можливість створити щось значуще. Ось принципи, якими я керуюсь.",
      visual: {
        title: "Візуальна сила",
        description: "Дизайн, який запам'ятовується та підсилює ваше повідомлення.",
      },
      structure: {
        title: "Продумана структура",
        description: "Логічна архітектура, яка веде користувача до дії.",
      },
      performance: {
        title: "Швидкодія",
        description: "Оптимізований код для максимальної продуктивності.",
      },
      trust: {
        title: "Надійність",
        description: "Якісна реалізація та прозора комунікація.",
      },
    },
    faq: {
      title: "FAQ",
      subtitle: "Часті питання",
      items: [
        {
          question: "Скільки коштує веб-сайт?",
          answer: "Вартість залежить від складності проєкту. Базовий лендінг — від $1,500, багатосторінковий сайт — від $3,000. Зв'яжіться зі мною для точного розрахунку.",
        },
        {
          question: "Який термін розробки?",
          answer: "Лендінг займає 2-3 тижні, корпоративний сайт — 4-8 тижнів. Точний термін визначається після обговорення проєкту.",
        },
        {
          question: "Чи надаєте підтримку після запуску?",
          answer: "Так, всі проєкти включають 30 днів безкоштовної підтримки. Далі доступні пакети технічної підтримки.",
        },
      ],
    },
    trust: {
      title: "Довіра",
      subtitle: "Чому мені довіряють",
      description: "Кожен проєкт — це партнерство. Я дотримуюсь принципів, які забезпечують результат.",
      points: [
        "Прозора комунікація на кожному етапі",
        "Дотримання термінів та бюджету",
        "Повна документація та передача знань",
        "Підтримка після запуску",
      ],
    },
    servicesPage: {
      title: "Послуги",
      headline: "Комплексна веб-",
      headlineHighlight: "розробка",
      subtitle: "Від концепції до запуску — все необхідне для сильної цифрової присутності",
      categoriesLabel: "Напрямки",
      categoriesTitle: "Три напрямки роботи",
      categories: {
        design: {
          title: "Дизайн",
          description: "Візуальна концепція, UI/UX, прототипування",
        },
        development: {
          title: "Розробка",
          description: "Фронтенд, бекенд, CMS інтеграція",
        },
        support: {
          title: "Підтримка",
          description: "Технічна підтримка, оновлення, розвиток",
        },
      },
    },
    steps: [
      { title: "Дослідження", description: "Аналіз цілей та аудиторії" },
      { title: "Стратегія", description: "Структура та візуальний напрямок" },
      { title: "Дизайн", description: "Візуальна концепція та UI/UX" },
      { title: "Розробка", description: "Технічна реалізація" },
      { title: "Запуск", description: "Тестування та публікація" },
    ],
    faqs: [
      { question: "Скільки коштує веб-сайт?", answer: "Вартість залежить від складності. Від $1,500 за лендінг." },
      { question: "Який термін розробки?", answer: "Лендінг — 2-3 тижні, корпоративний сайт — 4-8 тижнів." },
      { question: "Чи надаєте підтримку?", answer: "Так, 30 днів безкоштовної підтримки включено." },
    ],
    included: [
      { title: "Адаптивний дизайн", description: "Ідеальний вигляд на всіх пристроях" },
      { title: "SEO оптимізація", description: "Базова оптимізація для пошукових систем" },
      { title: "Аналітика", description: "Підключення Google Analytics" },
      { title: "Швидкість", description: "Оптимізація продуктивності" },
    ],
    notIncluded: [
      { title: "Контент", description: "Тексти та зображення надає клієнт" },
      { title: "Хостинг", description: "Оплата хостингу окремо" },
    ],
    models: [
      { title: "Фіксована ціна", description: "Для проєктів з чітким ТЗ", features: ["Визначений бюджет", "Фіксовані терміни"] },
      { title: "Time & Materials", description: "Для гнучких проєктів", features: ["Погодинна оплата", "Гнучкість змін"] },
    ],
    approaches: [
      { title: "Стратегічний підхід", description: "Кожен проєкт починається з аналізу" },
      { title: "Увага до деталей", description: "Якість у кожному пікселі" },
      { title: "Орієнтація на результат", description: "Фокус на конверсії та цілях" },
    ],
    reasons: [
      { title: "Досвід", description: "5+ років у веб-розробці" },
      { title: "Якість", description: "Високі стандарти коду та дизайну" },
      { title: "Комунікація", description: "Прозорість на кожному етапі" },
    ],
    sections: [
      { title: "Шлях", content: "Понад 5 років створюю веб-сайти для експертів та бізнесів." },
      { title: "Підхід", content: "Поєдную дизайн, технологію та стратегію для створення результативних рішень." },
    ],
    principles: [
      { title: "Якість", description: "Високі стандарти у всьому" },
      { title: "Прозорість", description: "Чітка комунікація" },
      { title: "Результат", description: "Фокус на цілях клієнта" },
    ],
    categories: [
      { title: "Фронтенд", items: ["React", "Next.js", "TypeScript"] },
      { title: "Дизайн", items: ["Figma", "Framer", "CSS/Tailwind"] },
      { title: "Інструменти", items: ["Git", "VS Code", "Vercel"] },
    ],
    methods: [
      { title: "Email", value: "hello@xray.studio", icon: "mail" },
      { title: "Telegram", value: "@xraystudio", icon: "send" },
    ],
    labels: {
      name: "Ваше ім'я",
      contact: "Email або Telegram",
      projectType: "Тип проєкту",
      message: "Розкажіть про проєкт",
      budget: "Бюджет",
      budgetOptional: "(опціонально)",
    },
    placeholders: {
      name: "Як до вас звертатись?",
      contact: "Як з вами зв'язатись?",
      projectType: "Оберіть тип проєкту",
      message: "Опишіть ваш проєкт, цілі та побажання...",
      budget: "Ваш бюджет на проєкт",
    },
    projectTypes: [
      "Лендінг",
      "Корпоративний сайт",
      "Інтернет-магазин",
      "Веб-додаток",
      "Редизайн",
      "Інше",
    ],
    success: {
      title: "Дякую!",
      description: "Ваше повідомлення надіслано. Я зв'яжусь з вами протягом 24 годин.",
    },
    privacy: {
      title: "Політика конфіденційності",
      lastUpdated: "Останнє оновлення",
    },
    notFound: {
      title: "404",
      subtitle: "Сторінку не знайдено",
      description: "Схоже, ця сторінка не існує або була переміщена.",
      backHome: "На головну",
    },
  },
  ru: {
    nav: {
      services: "Услуги",
      work: "Работы",
      about: "Обо мне",
      contact: "Контакт",
    },
    hero: {
      label: "Веб-разработчик",
      title: "Создаю сайты, которые",
      titleHighlight: "продают",
      subtitle:
        "Premium веб-разработка для экспертов, брендов и бизнесов, которым нужно сильное цифровое присутствие",
      cta: "Обсудить проект",
      ctaSecondary: "Посмотреть работы",
    },
    credibility: {
      experience: "лет опыта",
      projects: "проектов",
      clients: "довольных клиентов",
    },
    services: {
      title: "Услуги",
      subtitle: "Что я создаю",
      design: {
        title: "Дизайн",
        description: "Визуальная концепция и UI/UX дизайн",
      },
      development: {
        title: "Разработка",
        description: "Техническая реализация и программирование",
      },
      support: {
        title: "Поддержка",
        description: "Техническая поддержка и развитие",
      },
      cta: "Все услуги",
    },
    work: {
      title: "Работы",
      subtitle: "Избранные проекты",
      viewCase: "Посмотреть кейс",
      viewAll: "Все работы",
    },
    process: {
      title: "Процесс",
      subtitle: "Как я работаю",
      steps: {
        discovery: {
          title: "Исследование",
          description: "Анализ задачи, целей и аудитории",
        },
        strategy: {
          title: "Стратегия",
          description: "Структура, контент и визуальное направление",
        },
        design: {
          title: "Дизайн",
          description: "Визуальная концепция и UI/UX",
        },
        development: {
          title: "Разработка",
          description: "Техническая реализация",
        },
        launch: {
          title: "Запуск",
          description: "Тестирование и публикация",
        },
      },
    },
    about: {
      title: "Обо мне",
      subtitle: "Кто стоит за этим",
      greeting: "Привет, я Сергей",
      bio1: "Веб-разработчик с 5+ годами опыта в создании современных, ориентированных на конверсию веб-сайтов.",
      bio2: "Я специализируюсь на помощи экспертам и бизнесам строить сильное цифровое присутствие, которое превращает посетителей в клиентов.",
      description:
        "Веб-разработчик, который создаёт сайты как целостные digital-продукты — с продуманной структурой, сильной визуальной подачей и качественной реализацией.",
      cta: "Узнать больше",
    },
    contact: {
      title: "Контакт",
      subtitle: "Давайте создадим что-то вместе",
      description:
        "Есть проект? Напишите мне, и мы обсудим, как я могу помочь.",
      form: {
        name: "Ваше имя",
        email: "Email",
        message: "Сообщение",
        projectType: "Тип проекта",
        budget: "Бюджет",
        submit: "Отправить",
        sending: "Отправка...",
        success: "Спасибо! Я свяжусь с вами в ближайшее время.",
      },
      cta: "Написать мне",
    },
    footer: {
      rights: "Все права защищены",
      privacy: "Политика конфиденциальности",
    },
    theme: {
      light: "Светлая",
      dark: "Тёмная",
      system: "Системная",
    },
    cta: {
      primary: "Обсудить проект",
      secondary: "Посмотреть работы",
      contact: "Связаться",
      learnMore: "Узнать больше",
      ready: "Готовы?",
      title: "Давайте создадим что-то вместе",
      subtitle: "Есть проект? Напишите мне, и мы обсудим, как я могу помочь.",
      response: "Ответ в течение 24 часов",
      discuss: "Обсудить проект",
      examples: "Посмотреть примеры",
    },
    value: {
      title: "Ценности",
      subtitle: "Почему именно я",
      description: "Каждый проект — это возможность создать что-то значимое. Вот принципы, которыми я руководствуюсь.",
      visual: {
        title: "Визуальная сила",
        description: "Дизайн, который запоминается и усиливает ваше сообщение.",
      },
      structure: {
        title: "Продуманная структура",
        description: "Логичная архитектура, которая ведёт пользователя к действию.",
      },
      performance: {
        title: "Производительность",
        description: "Оптимизированный код для максимальной скорости.",
      },
      trust: {
        title: "Надёжность",
        description: "Качественная реализация и прозрачная коммуникация.",
      },
    },
    faq: {
      title: "FAQ",
      subtitle: "Частые вопросы",
      items: [
        {
          question: "Сколько стоит веб-сайт?",
          answer: "Стоимость зависит от сложности проекта. Базовый лендинг — от $1,500, многостраничный сайт — от $3,000. Свяжитесь со мной для точного расчёта.",
        },
        {
          question: "Какой срок разработки?",
          answer: "Лендинг занимает 2-3 недели, корпоративный сайт — 4-8 недель. Точный срок определяется после обсуждения проекта.",
        },
        {
          question: "Предоставляете ли поддержку после запуска?",
          answer: "Да, все проекты включают 30 дней бесплатной поддержки. Далее доступны пакеты технической поддержки.",
        },
      ],
    },
    trust: {
      title: "Доверие",
      subtitle: "Почему мне доверяют",
      description: "Каждый проект — это партнёрство. Я придерживаюсь принципов, которые обеспечивают результат.",
      points: [
        "Прозрачная коммуникация на каждом этапе",
        "Соблюдение сроков и бюджета",
        "Полная документация и передача знаний",
        "Поддержка после запуска",
      ],
    },
    servicesPage: {
      title: "Услуги",
      headline: "Комплексная веб-",
      headlineHighlight: "разработка",
      subtitle: "От концепции до запуска — всё необходимое для сильного цифрового присутствия",
      categoriesLabel: "Направления",
      categoriesTitle: "Три направления работы",
      categories: {
        design: {
          title: "Дизайн",
          description: "Визуальная концепция, UI/UX, прототипирование",
        },
        development: {
          title: "Разработка",
          description: "Фронтенд, бекенд, CMS интеграция",
        },
        support: {
          title: "Поддержка",
          description: "Техническая поддержка, обновления, развитие",
        },
      },
    },
    steps: [
      { title: "Исследование", description: "Анализ целей и аудитории" },
      { title: "Стратегия", description: "Структура и визуальное направление" },
      { title: "Дизайн", description: "Визуальная концепция и UI/UX" },
      { title: "Разработка", description: "Техническая реализация" },
      { title: "Запуск", description: "Тестирование и публикация" },
    ],
    faqs: [
      { question: "Сколько стоит веб-сайт?", answer: "Стоимость зависит от сложности. От $1,500 за лендинг." },
      { question: "Какой срок разработки?", answer: "Лендинг — 2-3 недели, корпоративный сайт — 4-8 недель." },
      { question: "Предоставляете ли поддержку?", answer: "Да, 30 дней бесплатной поддержки включено." },
    ],
    included: [
      { title: "Адаптивный дизайн", description: "Идеальный вид на всех устройствах" },
      { title: "SEO оптимизация", description: "Базовая оптимизация для поисковых систем" },
      { title: "Аналитика", description: "Подключение Google Analytics" },
      { title: "Скорость", description: "Оптимизация производительности" },
    ],
    notIncluded: [
      { title: "Контент", description: "Тексты и изображения предоставляет клиент" },
      { title: "Хостинг", description: "Оплата хостинга отдельно" },
    ],
    models: [
      { title: "Фиксированная цена", description: "Для проектов с чётким ТЗ", features: ["Определённый бюджет", "Фиксированные сроки"] },
      { title: "Time & Materials", description: "Для гибких проектов", features: ["Почасовая оплата", "Гибкость изменений"] },
    ],
    approaches: [
      { title: "Стратегический подход", description: "Каждый проект начинается с анализа" },
      { title: "Внимание к деталям", description: "Качество в каждом пикселе" },
      { title: "Ориентация на результат", description: "Фокус на конверсии и целях" },
    ],
    reasons: [
      { title: "Опыт", description: "5+ лет в веб-разработке" },
      { title: "Качество", description: "Высокие стандарты кода и дизайна" },
      { title: "Коммуникация", description: "Прозрачность на каждом этапе" },
    ],
    sections: [
      { title: "Путь", content: "Более 5 лет создаю веб-сайты для экспертов и бизнесов." },
      { title: "Подход", content: "Сочетаю дизайн, технологию и стратегию для создания результативных решений." },
    ],
    principles: [
      { title: "Качество", description: "Высокие стандарты во всём" },
      { title: "Прозрачность", description: "Чёткая коммуникация" },
      { title: "Результат", description: "Фокус на целях клиента" },
    ],
    categories: [
      { title: "Фронтенд", items: ["React", "Next.js", "TypeScript"] },
      { title: "Дизайн", items: ["Figma", "Framer", "CSS/Tailwind"] },
      { title: "Инструменты", items: ["Git", "VS Code", "Vercel"] },
    ],
    methods: [
      { title: "Email", value: "hello@xray.studio", icon: "mail" },
      { title: "Telegram", value: "@xraystudio", icon: "send" },
    ],
    labels: {
      name: "Ваше имя",
      contact: "Email или Telegram",
      projectType: "Тип проекта",
      message: "Расскажите о проекте",
      budget: "Бюджет",
      budgetOptional: "(опционально)",
    },
    placeholders: {
      name: "Как к вам обращаться?",
      contact: "Как с вами связаться?",
      projectType: "Выберите тип проекта",
      message: "Опишите ваш проект, цели и пожелания...",
      budget: "Ваш бюджет на проект",
    },
    projectTypes: [
      "Лендинг",
      "Корпоративный сайт",
      "Интернет-магазин",
      "Веб-приложение",
      "Редизайн",
      "Другое",
    ],
    success: {
      title: "Спасибо!",
      description: "Ваше сообщение отправлено. Я свяжусь с вами в течение 24 часов.",
    },
    privacy: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление",
    },
    notFound: {
      title: "404",
      subtitle: "Страница не найдена",
      description: "Похоже, эта страница не существует или была перемещена.",
      backHome: "На главную",
    },
  },
  en: {
    nav: {
      services: "Services",
      work: "Work",
      about: "About",
      contact: "Contact",
    },
    hero: {
      label: "Web Developer",
      title: "I build websites that",
      titleHighlight: "convert",
      subtitle:
        "Premium web development for experts, brands, and businesses that need a strong digital presence",
      cta: "Discuss Project",
      ctaSecondary: "View Work",
    },
    credibility: {
      experience: "years experience",
      projects: "projects",
      clients: "happy clients",
    },
    services: {
      title: "Services",
      subtitle: "What I Create",
      design: {
        title: "Design",
        description: "Visual concept and UI/UX design",
      },
      development: {
        title: "Development",
        description: "Technical implementation and coding",
      },
      support: {
        title: "Support",
        description: "Technical support and growth",
      },
      cta: "All Services",
    },
    work: {
      title: "Work",
      subtitle: "Selected Projects",
      viewCase: "View Case",
      viewAll: "All Work",
    },
    process: {
      title: "Process",
      subtitle: "How I Work",
      steps: {
        discovery: {
          title: "Discovery",
          description: "Analysis of goals and audience",
        },
        strategy: {
          title: "Strategy",
          description: "Structure, content and visual direction",
        },
        design: {
          title: "Design",
          description: "Visual concept and UI/UX",
        },
        development: {
          title: "Development",
          description: "Technical implementation",
        },
        launch: {
          title: "Launch",
          description: "Testing and deployment",
        },
      },
    },
    about: {
      title: "About",
      subtitle: "The Person Behind",
      greeting: "Hi, I'm Serhii",
      bio1: "Web developer with 5+ years of experience building modern, conversion-focused websites.",
      bio2: "I specialize in helping experts and businesses build a strong digital presence that turns visitors into clients.",
      description:
        "Web developer who creates websites as complete digital products — with thoughtful structure, strong visual presentation, and quality implementation.",
      cta: "Learn More",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's create something together",
      description:
        "Have a project? Write to me, and we'll discuss how I can help.",
      form: {
        name: "Your Name",
        email: "Email",
        message: "Message",
        projectType: "Project Type",
        budget: "Budget",
        submit: "Send",
        sending: "Sending...",
        success: "Thank you! I'll get back to you soon.",
      },
      cta: "Write to Me",
    },
    footer: {
      rights: "All rights reserved",
      privacy: "Privacy Policy",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    cta: {
      primary: "Discuss Project",
      secondary: "View Work",
      contact: "Get in Touch",
      learnMore: "Learn More",
      ready: "Ready?",
      title: "Let's create something together",
      subtitle: "Have a project? Write to me, and we'll discuss how I can help.",
      response: "Response within 24 hours",
      discuss: "Discuss Project",
      examples: "View Examples",
    },
    value: {
      title: "Values",
      subtitle: "Why Work With Me",
      description: "Every project is an opportunity to create something meaningful. Here are the principles that guide my work.",
      visual: {
        title: "Visual Impact",
        description: "Design that captivates and amplifies your message.",
      },
      structure: {
        title: "Thoughtful Structure",
        description: "Logical architecture that guides users to action.",
      },
      performance: {
        title: "Performance",
        description: "Optimized code for maximum speed and efficiency.",
      },
      trust: {
        title: "Reliability",
        description: "Quality implementation and transparent communication.",
      },
    },
    faq: {
      title: "FAQ",
      subtitle: "Common Questions",
      items: [
        {
          question: "How much does a website cost?",
          answer: "Cost depends on project complexity. A basic landing page starts from $1,500, multi-page sites from $3,000. Contact me for an accurate estimate.",
        },
        {
          question: "What's the development timeline?",
          answer: "A landing page takes 2-3 weeks, a corporate site 4-8 weeks. Exact timeline is determined after project discussion.",
        },
        {
          question: "Do you provide post-launch support?",
          answer: "Yes, all projects include 30 days of free support. Extended technical support packages are also available.",
        },
      ],
    },
    trust: {
      title: "Trust",
      subtitle: "Why Clients Trust Me",
      description: "Every project is a partnership. I follow principles that ensure results.",
      points: [
        "Transparent communication at every stage",
        "Adherence to timelines and budgets",
        "Full documentation and knowledge transfer",
        "Post-launch support",
      ],
    },
    servicesPage: {
      title: "Services",
      headline: "Comprehensive web",
      headlineHighlight: "development",
      subtitle: "From concept to launch — everything needed for a strong digital presence",
      categoriesLabel: "Directions",
      categoriesTitle: "Three areas of work",
      categories: {
        design: {
          title: "Design",
          description: "Visual concept, UI/UX, prototyping",
        },
        development: {
          title: "Development",
          description: "Frontend, backend, CMS integration",
        },
        support: {
          title: "Support",
          description: "Technical support, updates, growth",
        },
      },
    },
    steps: [
      { title: "Discovery", description: "Analysis of goals and audience" },
      { title: "Strategy", description: "Structure and visual direction" },
      { title: "Design", description: "Visual concept and UI/UX" },
      { title: "Development", description: "Technical implementation" },
      { title: "Launch", description: "Testing and deployment" },
    ],
    faqs: [
      { question: "How much does a website cost?", answer: "Cost depends on complexity. From $1,500 for a landing page." },
      { question: "What's the development timeline?", answer: "Landing page — 2-3 weeks, corporate site — 4-8 weeks." },
      { question: "Do you provide support?", answer: "Yes, 30 days of free support included." },
    ],
    included: [
      { title: "Responsive design", description: "Perfect look on all devices" },
      { title: "SEO optimization", description: "Basic search engine optimization" },
      { title: "Analytics", description: "Google Analytics integration" },
      { title: "Speed", description: "Performance optimization" },
    ],
    notIncluded: [
      { title: "Content", description: "Texts and images provided by client" },
      { title: "Hosting", description: "Hosting paid separately" },
    ],
    models: [
      { title: "Fixed price", description: "For projects with clear specs", features: ["Defined budget", "Fixed deadlines"] },
      { title: "Time & Materials", description: "For flexible projects", features: ["Hourly rate", "Flexibility"] },
    ],
    approaches: [
      { title: "Strategic approach", description: "Every project starts with analysis" },
      { title: "Attention to detail", description: "Quality in every pixel" },
      { title: "Results-oriented", description: "Focus on conversion and goals" },
    ],
    reasons: [
      { title: "Experience", description: "5+ years in web development" },
      { title: "Quality", description: "High standards in code and design" },
      { title: "Communication", description: "Transparency at every stage" },
    ],
    sections: [
      { title: "Journey", content: "Over 5 years building websites for experts and businesses." },
      { title: "Approach", content: "I combine design, technology, and strategy to create effective solutions." },
    ],
    principles: [
      { title: "Quality", description: "High standards in everything" },
      { title: "Transparency", description: "Clear communication" },
      { title: "Results", description: "Focus on client goals" },
    ],
    categories: [
      { title: "Frontend", items: ["React", "Next.js", "TypeScript"] },
      { title: "Design", items: ["Figma", "Framer", "CSS/Tailwind"] },
      { title: "Tools", items: ["Git", "VS Code", "Vercel"] },
    ],
    methods: [
      { title: "Email", value: "hello@xray.studio", icon: "mail" },
      { title: "Telegram", value: "@xraystudio", icon: "send" },
    ],
    labels: {
      name: "Your name",
      contact: "Email or Telegram",
      projectType: "Project type",
      message: "Tell me about your project",
      budget: "Budget",
      budgetOptional: "(optional)",
    },
    placeholders: {
      name: "What should I call you?",
      contact: "How can I reach you?",
      projectType: "Select project type",
      message: "Describe your project, goals, and preferences...",
      budget: "Your project budget",
    },
    projectTypes: [
      "Landing page",
      "Corporate website",
      "E-commerce",
      "Web application",
      "Redesign",
      "Other",
    ],
    success: {
      title: "Thank you!",
      description: "Your message has been sent. I'll get back to you within 24 hours.",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated",
    },
    notFound: {
      title: "404",
      subtitle: "Page not found",
      description: "Looks like this page doesn't exist or has been moved.",
      backHome: "Back to home",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];

export function getTranslations(locale: Locale) {
  return translations[locale];
}
