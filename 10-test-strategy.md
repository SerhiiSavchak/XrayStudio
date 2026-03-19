# 09-test-strategy.md

## 1. Короткий вывод

Для личного сайта веб-разработчика не нужна тяжёлая enterprise-QA-система, но и подхода “посмотрел глазами и залил” недостаточно.

Оптимальная стратегия для этого проекта:
- использовать **behavior-first / test-first** для критичных пользовательских сценариев
- держать **manual QA** как обязательный слой контроля качества
- ввести **smoke checks** перед релизами
- закрыть **критичные user flows** несколькими **e2e-тестами**
- проверять **performance, responsive behavior, forms, navigation, media, animations, accessibility basics и SEO basics** как часть Definition of Done, а не как опциональную задачу в конце

Главный принцип:  
**тестировать не всё подряд, а то, что влияет на заявки, доверие, UX, perceived quality и устойчивость сайта в продакшене.**

---

## 2. Test Strategy

### 2.1. Цель

Построить практичную и поддерживаемую стратегию тестирования, которая позволит:
- снижать риск поломки ключевых конверсионных сценариев
- контролировать качество визуально сильного и motion-heavy интерфейса
- держать под контролем performance и responsive behavior
- вовремя ловить регрессии в формах, CTA, навигации и media behavior
- поддерживать production-ready качество без ненужного усложнения

---

### 2.2. Контекст проекта

Проект — личный сайт веб-разработчика, который одновременно решает две задачи:

1. Работает как коммерческий инструмент для получения заявок  
2. Выступает как pilot / pet-project, в котором отрабатываются:
   - documentation-first
   - system-first thinking
   - AI-assisted workflow
   - behavior-first / test-first там, где это оправдано
   - production-ready подход

Из-за этого тестирование должно проверять не только “работает ли код”, но и:
- не ломается ли восприятие сайта как premium digital product
- не мешают ли motion и media UX
- не теряются ли заявки из-за формы, CTA или ошибок интеграции
- не деградирует ли сайт на мобильных и слабых устройствах

---

### 2.3. Принципы стратегии

#### 1. Product-first testing
Тестируем в первую очередь то, что влияет на:
- конверсию
- доверие
- UX
- стабильность ключевых сценариев
- скорость и плавность

#### 2. Behavior-first для критичных фич
До реализации важных фич сначала фиксируем:
- user story
- expected behavior
- acceptance criteria
- edge cases
- manual test cases

#### 3. Manual QA обязателен
Поскольку сайт делает сильный упор на:
- визуал
- анимации
- layered UI
- media experience
- premium feel

ручной QA обязателен. Автотесты не смогут полноценно оценить:
- визуальную целостность
- timing motion
- perceived smoothness
- читаемость на реальных устройствах
- ощущение “дорогого” интерфейса

#### 4. Автоматизируем только критичное
Автоматизация нужна там, где ошибка реально стоит дорого:
- формы
- CTA flows
- навигация
- ключевые переходы
- основные интеракции
- backend logic / integrations

#### 5. Performance и accessibility — это quality gates
Эти проверки не должны жить отдельно от QA.  
Они должны быть частью критериев готовности ключевых страниц и фич.

---

### 2.4. Scope тестирования

#### In scope
- ключевые страницы сайта
- формы и lead flow
- CTA
- навигация
- responsive behavior
- media blocks
- animations / transitions / scroll interactions
- базовая accessibility
- базовый SEO
- performance checks
- поведение на мобильных и слабых устройствах
- аналитика конверсионных событий

#### Out of scope по умолчанию
- избыточное unit-тестирование статичных секций
- попытка автоматизировать “красоту” UI
- snapshot-тестирование всего сайта
- сложная QA-бюрократия без практической пользы
- покрытие тестами purely decorative деталей без бизнес-ценности

---

### 2.5. Уровни тестирования

#### 1. Manual QA
Основной слой контроля качества для:
- визуальной проверки
- layout integrity
- motion QA
- responsive QA
- content QA
- media QA
- UX-проверки на реальных устройствах

#### 2. Smoke checks
Быстрые обязательные проверки после значимых изменений и перед релизом:
- страницы открываются
- ключевые CTA работают
- форма отправляется
- навигация не сломана
- mobile menu работает
- hero/media не ломают экран
- критичных визуальных регрессий нет

#### 3. Feature acceptance
Для каждой важной фичи:
- expected behavior
- acceptance criteria
- happy path
- edge cases
- fallback behavior

#### 4. Responsive QA
Проверка основных экранов и сценариев на:
- mobile
- tablet
- laptop
- desktop
- wide desktop

#### 5. Performance checks
Проверка:
- first load
- hero loading
- CLS
- media strategy
- motion cost
- scroll smoothness
- mobile degradation
- CPU/network throttling behavior

#### 6. Accessibility basics
Проверка:
- semantic structure
- keyboard access
- focus states
- alt/labels
- contrast
- reduced motion
- form accessibility basics

#### 7. SEO basics
Проверка:
- title / meta
- headings
- canonical / robots / sitemap
- indexability
- OG tags
- semantic page structure

#### 8. Automated tests
Минимальный, но полезный слой:
- unit — для логики
- integration — для форм и интерактивных компонентов
- e2e — для критичных user flows

---

### 2.6. Recommended test stack

#### Manual / exploratory
- Browser DevTools
- device toolbar / responsive mode
- реальное мобильное устройство
- CPU throttling
- network throttling
- Lighthouse
- accessibility inspector / axe

#### Automated
- **Playwright** — e2e и smoke
- **Vitest** — unit tests
- **React Testing Library** — integration tests
- **Lighthouse / Lighthouse CI** — performance / SEO / accessibility baseline
- **ESLint + TypeScript** — ранний контроль качества
- **axe / axe-playwright** — базовые a11y-проверки

---

### 2.7. Definition of Done для фичи

Фича считается готовой, если:
- описано expected behavior
- определены acceptance criteria
- пройден happy path
- проверены edge cases
- не сломан mobile
- не сломан critical UX
- нет критичной деградации performance
- CTA / navigation / media behavior работают корректно
- нет blocking accessibility issues
- при необходимости добавлены integration или e2e checks

---

## 3. Что тестируем и почему

### 3.1. Manual QA

#### Что тестируем
- визуальную целостность страниц
- отступы, выравнивания, типографику
- корректность секций и контентного порядка
- hover / focus / active states
- scroll behavior
- overlays / sticky elements
- общую консистентность UI

#### Почему
Потому что premium-сайт продаёт не только смыслом, но и качеством восприятия.  
Большая часть “дорогого ощущения” определяется именно ручной проверкой.

---

### 3.2. Smoke checks

#### Что тестируем
- homepage рендерится без критичных ошибок
- все ключевые страницы открываются
- ключевые CTA кликабельны
- форма отправляется
- success и error states отображаются
- mobile menu работает
- header / footer links работают
- hero секция не пустая и не сломанная
- нет критичного слома адаптива

#### Почему
Smoke checks дают быстрый ответ на вопрос:  
**проект вообще не поломали после изменений?**

---

### 3.3. Feature acceptance

#### Что тестируем
Для каждой важной фичи фиксируем:
- что пользователь должен получить
- как должна вести себя фича
- где happy path
- какие edge cases возможны
- какой должен быть fallback

#### Почему
Acceptance criteria убирают размытость.  
Фича принимается не “на ощущениях”, а по понятным проверяемым правилам.

---

### 3.4. Responsive QA

#### Что тестируем
- mobile-first layout
- брейкпоинты
- гриды и карточки
- типографику и длину строк
- hero behavior
- sticky/fixed элементы
- mobile nav
- медиа-блоки
- CTA visibility
- touch usability

#### Почему
Визуально сильный сайт часто начинает ломаться именно на адаптиве.  
Responsive QA обязателен для доверия и конверсии.

---

### 3.5. Performance checks

#### Что тестируем
- скорость загрузки first screen
- hero media strategy
- image optimization
- video behavior
- lazy loading
- script weight
- font loading
- CLS
- scroll smoothness
- CPU/network throttled behavior

#### Почему
Для media-heavy сайта performance — это часть продукта.  
Медленный “красивый” сайт часто проигрывает менее эффектному, но быстрому.

---

### 3.6. Accessibility basics

#### Что тестируем
- правильную heading hierarchy
- alt texts
- button/link labels
- focus visibility
- keyboard navigation
- form labels and errors
- color contrast
- reduced motion support

#### Почему
Даже базовая accessibility:
- повышает качество интерфейса
- уменьшает UX-ошибки
- делает сайт более устойчивым
- косвенно помогает SEO и общему качеству реализации

---

### 3.7. SEO basics

#### Что тестируем
- title и meta description
- H1 и иерархию заголовков
- canonical
- robots
- sitemap
- indexability
- open graph
- semantic HTML
- понятные URL

#### Почему
SEO-база должна быть заложена с начала.  
Если отложить это на потом, структура проекта часто начинает конфликтовать с SEO-задачами.

---

### 3.8. Формы

#### Что тестируем
- required / optional fields
- validation rules
- empty submit
- invalid email / phone
- textarea limits
- loading state
- disabled state during submit
- success state
- error state
- retry behavior
- double-submit prevention
- mobile form usability
- analytics tracking for submit

#### Почему
Форма — это главный conversion point.  
Любая ошибка здесь напрямую влияет на потерю лидов.

---

### 3.9. CTA

#### Что тестируем
- корректность ссылок и переходов
- consistency текста CTA
- наличие primary CTA на ключевых экранах
- заметность CTA на mobile
- отсутствие блокировки CTA анимациями/оверлеями
- понятность следующего шага после клика

#### Почему
CTA — это мост между красивым сайтом и заявкой.  
Если CTA плохие, сайт теряет коммерческую эффективность.

---

### 3.10. Навигация

#### Что тестируем
- header navigation
- footer navigation
- mobile menu
- anchor links
- active states
- sticky header behavior
- back navigation
- логичность пути до формы / контакта / услуги

#### Почему
Навигация формирует управляемость интерфейса.  
Если пользователь теряется, конверсия падает независимо от визуала.

---

### 3.11. Медиа и анимации

#### Что тестируем
- загрузку изображений
- загрузку видео
- placeholders / posters / fallbacks
- reveal animations
- hover interactions
- scroll-based effects
- touch-device behavior
- reduced motion mode
- layering stability
- отсутствие jank / stutter / blocked content

#### Почему
Для этого проекта медиа и motion — часть core experience.  
Их нужно тестировать как функциональный слой, а не только как декор.

---

### 3.12. Поведение на слабых устройствах

#### Что тестируем
- CPU throttling
- slow network
- weaker mobile devices
- reduced motion
- degraded scroll performance
- fallback behavior при недогрузке медиа

#### Почему
Сайт должен выглядеть дорого, но не быть хрупким.  
Важно, чтобы он сохранял usability даже вне идеальных условий.

---

## 4. QA Checklist Structure

Ниже — рекомендуемая структура рабочего QA checklist, который можно использовать перед staging review и перед launch.

---

### A. Smoke Check

#### A.1. Core pages
- [ ] Homepage открывается без критичных ошибок
- [ ] Services page открывается
- [ ] Cases / Selected Work page открывается
- [ ] About page открывается
- [ ] Contact page открывается
- [ ] FAQ page открывается
- [ ] Нет 404/500 на ключевых маршрутах

#### A.2. Core actions
- [ ] Primary CTA работает
- [ ] Secondary CTA работает
- [ ] Contact form отправляется
- [ ] Success state отображается
- [ ] Error state отображается
- [ ] Mobile menu открывается и закрывается
- [ ] Header links работают
- [ ] Footer links работают

#### A.3. Core rendering
- [ ] Hero отображается корректно
- [ ] Above-the-fold контент не пустой
- [ ] Нет blocking overlays
- [ ] Нет критично сломанной верстки

---

### B. Page Integrity Check

Для каждой ключевой страницы:

- [ ] Есть корректный page title
- [ ] Hero / page intro визуально целостен
- [ ] Главный смысл страницы понятен
- [ ] Есть понятный CTA
- [ ] Блоки идут в правильном порядке
- [ ] Нет пустых или случайно скрытых секций
- [ ] Нет placeholder-контента
- [ ] Нет явных проблем со spacing / alignment
- [ ] Нет битых изображений
- [ ] Нет битых ссылок

---

### C. Content QA

- [ ] Орфография и пунктуация проверены
- [ ] Нет lorem ipsum / temporary text
- [ ] Нет внутренних технических заметок в UI
- [ ] Услуги описаны понятно
- [ ] Кейсы не выглядят незавершёнными
- [ ] About section усиливает доверие
- [ ] Контактная информация актуальна
- [ ] Тексты CTA консистентны
- [ ] Тексты не обрываются на адаптиве

---

### D. Responsive QA

Проверять минимум на:
- small mobile
- large mobile
- tablet
- laptop
- desktop
- wide desktop

#### D.1. Layout
- [ ] Нет горизонтального скролла
- [ ] Секции не ломаются
- [ ] Карточки / гриды перестраиваются корректно
- [ ] Текст читаем
- [ ] Кнопки доступны для тапа
- [ ] Нет наложения слоёв
- [ ] Fixed/sticky элементы не перекрывают контент

#### D.2. UX
- [ ] CTA остаются заметными
- [ ] Header usable на mobile
- [ ] Mobile menu usable
- [ ] Формы удобны на mobile
- [ ] Медиа не ломают layout
- [ ] Hero не становится перегруженным на маленьком экране

---

### E. Form QA

#### E.1. Functional
- [ ] Все required fields обязательны
- [ ] Invalid email не проходит
- [ ] Пустая форма не отправляется
- [ ] Частично заполненная форма ведёт себя ожидаемо
- [ ] Loading state отображается
- [ ] Submit button не допускает accidental multi-submit
- [ ] Success state понятен
- [ ] Error state понятен
- [ ] Retry после ошибки работает

#### E.2. UX
- [ ] Форма не выглядит тяжёлой
- [ ] Пользователь понимает, что делать
- [ ] Ошибки указывают на конкретную проблему
- [ ] Форма удобна с клавиатуры
- [ ] Форма удобна на mobile

#### E.3. Data / integrations
- [ ] Lead реально доходит в нужную систему / inbox / storage
- [ ] Нет потери данных
- [ ] Analytics submit event отправляется
- [ ] Success conversion не срабатывает при failed submit

---

### F. CTA QA

- [ ] У homepage есть понятный primary CTA
- [ ] На ключевых страницах есть следующий шаг
- [ ] CTA тексты не слишком абстрактны
- [ ] CTA ведут туда, куда обещают
- [ ] CTA кликабельны на mobile
- [ ] CTA не перекрываются анимацией или overlay
- [ ] CTA не выглядят disabled без причины
- [ ] CTA path логичен с точки зрения воронки

---

### G. Navigation QA

- [ ] Header navigation полная и логичная
- [ ] Footer navigation работает
- [ ] Mobile navigation не ломается
- [ ] Anchors прокручивают корректно
- [ ] Sticky header не закрывает целевой контент
- [ ] Active states понятны
- [ ] Пользователь может быстро дойти до контакта / формы / услуг
- [ ] Нет тупиковых страниц без следующего шага

---

### H. Media QA

- [ ] Изображения загружаются корректно
- [ ] Используются правильные размеры и соотношения сторон
- [ ] Нет растянутых или размытых изображений
- [ ] Видео имеет poster / fallback where needed
- [ ] Lazy loading включён там, где уместно
- [ ] Нет пустых медиа-контейнеров
- [ ] Нет flash / jump при загрузке
- [ ] Медиа не ломает layout на mobile

---

### I. Animation QA

- [ ] Reveal animations не задерживают доступ к контенту
- [ ] Scroll interactions запускаются корректно
- [ ] Hover effects не мешают touch UX
- [ ] Анимации не блокируют клики
- [ ] Нет заметного jank
- [ ] Нет избыточного motion noise
- [ ] Reduced motion работает
- [ ] Без анимаций сайт остаётся понятным и полноценным

---

### J. Performance QA

#### J.1. First load
- [ ] Hero загружается достаточно быстро
- [ ] Above-the-fold не зависит полностью от тяжёлого видео
- [ ] Шрифты не вызывают сильный CLS
- [ ] Главный контент доступен быстро

#### J.2. Runtime
- [ ] Scroll не дёргается на средних устройствах
- [ ] Анимации не перегружают CPU
- [ ] Взаимодействие остаётся отзывчивым
- [ ] Нет сильной деградации на throttling

#### J.3. Asset strategy
- [ ] Изображения оптимизированы
- [ ] Видео подключено осмысленно
- [ ] Не-критичные ассеты lazy-loaded
- [ ] Нет очевидно тяжёлых бесполезных скриптов

---

### K. Accessibility Basics

- [ ] Есть один понятный H1 на странице
- [ ] Heading hierarchy логична
- [ ] Все meaningful images имеют alt
- [ ] Buttons / links имеют понятные названия
- [ ] Focus states видимы
- [ ] Keyboard navigation работает для core flows
- [ ] Контраст у текста и CTA достаточный
- [ ] Формы имеют labels и понятные error messages
- [ ] Reduced motion respected

---

### L. SEO Basics

- [ ] У каждой ключевой страницы есть уникальный title
- [ ] Есть meta description
- [ ] H1 соответствует назначению страницы
- [ ] Заголовки не сломаны по структуре
- [ ] Страница индексируема там, где нужно
- [ ] Robots настроен корректно
- [ ] Sitemap доступен
- [ ] Canonical настроен корректно, если нужен
- [ ] Open Graph basics настроены
- [ ] URL чистые и читаемые

---

### M. Analytics / Lead Tracking

- [ ] Page view tracking работает
- [ ] CTA clicks tracking работает
- [ ] Form submit event отправляется
- [ ] Success conversion event срабатывает корректно
- [ ] Ошибочный submit не считается conversion
- [ ] Нет дублей событий
- [ ] Ключевые воронки можно отследить после запуска рекламы

---

### N. Weak Device / Real-World QA

- [ ] Сайт usable при slow network
- [ ] Сайт usable при CPU throttling
- [ ] Hero не ломает слабые устройства
- [ ] Анимации не превращают сайт в лагучий
- [ ] Основной контент доступен даже при проблемах с медиа
- [ ] Mobile experience остаётся адекватным

---

## 5. Рекомендации по test-first

### 5.1. Где test-first действительно уместен

#### 1. Формы
Лучший кандидат для behavior-first / test-first.

Сначала фиксировать:
- какие поля обязательны
- какие правила валидации
- как выглядит loading state
- что считается success
- что считается fail
- что происходит при повторной отправке
- как обрабатываются network/server errors

#### 2. Навигация
Особенно если есть:
- mobile menu
- sticky header
- anchor navigation
- section-based homepage
- multiple CTA entry points

Сначала описать:
- expected path
- доступность ключевых маршрутов
- поведение меню
- поведение при скролле

#### 3. CTA flows
Нужно заранее определить:
- какие CTA являются primary
- куда они ведут
- какой следующий шаг после клика
- как измеряется успех
- как обрабатываются альтернативные пути

#### 4. Интерактивные компоненты
Например:
- FAQ accordion
- tabs
- sliders/carousels
- filters
- service comparison blocks
- interactive brief / quiz
- AI assistant flow, если появится

#### 5. Backend logic / integrations
Если будут:
- form handlers
- email / Telegram / CRM integrations
- analytics mapping
- API routes
- AI features
- CMS transformations

их лучше проектировать через expected behavior заранее.

---

### 5.2. Где test-first не нужен или нужен минимально

#### 1. Статичные контентные блоки
Не нужно писать test-first на:
- простые текстовые секции
- статичные описания услуг
- простые декоративные блоки

#### 2. Микродетали дизайна
Не нужно формализовать через тесты:
- глубину тени
- “насколько дорого выглядит”
- точный эмоциональный эффект motion
- тонкие нюансы декоративного pacing

Это зона design review и manual QA.

#### 3. Чисто декоративные анимации
Не нужно автоматизировать “красоту” анимации.  
Нужно тестировать:
- не мешает ли
- не тормозит ли
- не блокирует ли контент
- не ломает ли touch UX
- работает ли reduced motion

---

### 5.3. Behavior-first template для фич

Для всех важных фич использовать единый шаблон.

#### Feature
Название фичи

#### Goal
Какую задачу решает фича

#### User story
Как пользователь, я хочу ..., чтобы ...

#### Expected behavior
Что должно происходить в нормальном сценарии

#### Acceptance criteria
- ...
- ...
- ...

#### Edge cases
- ...
- ...
- ...

#### Failure / fallback behavior
- ...
- ...
- ...

#### Manual test cases
- ...
- ...
- ...

#### Automation candidate
- none / unit / integration / e2e

---

### 5.4. Recommended automated testing outline

#### Unit tests
Использовать только там, где есть логика:
- form validation utils
- helper functions
- content mappers
- analytics payload builders
- API-related utility logic
- state transition helpers

#### Integration tests
Использовать для:
- form component behavior
- error/success UI states
- FAQ / accordion / tabs
- mobile nav logic
- CTA-triggered UI flows
- analytics trigger logic
- data submission flow на уровне UI + logic

#### E2E tests
Минимальный набор must-have:

##### E2E-1. Homepage smoke
- пользователь открывает homepage
- hero отображается
- primary CTA виден
- ключевой контент доступен

##### E2E-2. Navigation flow
- пользователь использует header/menu
- доходит до ключевых страниц / секций
- переходы работают корректно

##### E2E-3. Lead form happy path
- пользователь заполняет валидные данные
- отправляет форму
- видит success state

##### E2E-4. Lead form invalid path
- пользователь вводит невалидные данные
- видит ошибки
- форма не отправляется молча

##### E2E-5. Mobile CTA flow
- пользователь открывает mobile menu
- доходит до contact / service / form path
- CTA остаётся доступным и понятным

##### E2E-6. Critical page rendering
- открываются homepage + services + contact
- нет критичных UI-breakages
- основные блоки присутствуют

---

### 5.5. Recommended MVP testing model

Для MVP этого проекта достаточно следующей зрелой системы:

#### Manual
- полный manual QA checklist
- responsive QA
- media + motion QA
- real-device QA
- pre-launch pass

#### Automated
- 4–6 Playwright e2e сценариев
- unit tests только для логики
- integration tests для форм и интерактивных блоков
- Lighthouse baseline для homepage и ключевых страниц

#### Process
- acceptance criteria перед реализацией важных фич
- smoke checks перед релизами
- pre-launch regression pass
- post-launch sanity check после деплоя

---

## Финальная рекомендация

Для этого сайта лучше всего подходит такая модель:

- **manual QA как основа**
- **test-first для критичных flows**
- **smoke checks как обязательный этап**
- **несколько e2e для основных конверсионных сценариев**
- **performance / accessibility / SEO как quality gates**
- **без перегруза unit-тестами там, где нет реальной логики**

Главная ошибка, которой нужно избежать:
либо полностью недооценить QA у визуально сложного сайта, либо превратить небольшой проект в тяжёлую enterprise-систему тестирования.

Правильный баланс для этого проекта:
**строгая проверка критичного + ручной контроль визуального + минимально достаточная автоматизация.**