# Architecture.md

## 1. Короткий вывод

Этот проект должен строиться не как «просто красивый лендинг», а как **production-ready full-stack marketing platform** с сильным визуальным слоем, но с жёстким контролем над производительностью, поддерживаемостью и дальнейшим масштабированием.

Рекомендуемая архитектура:

* **Next.js App Router + TypeScript + Tailwind CSS**
* **server-first подход**
* **client islands только для интерактива, анимаций и media orchestration**
* **контент отделён от UI**
* **forms / leads / integrations проходят через server-side слой**
* **внешние сервисы подключаются через adapters/providers**
* **AI-фичи изолируются как отдельный capability layer, а не размазываются по проекту**

Главная идея: сайт должен быть визуально дорогим и сильным, но при этом оставаться архитектурно чистым, удобным для Cursor workflow и готовым к росту в сторону backend/integrations/CMS/AI.

---

## 2. Recommended Architecture

### 2.1 Цель архитектуры

Архитектура должна решать сразу несколько задач:

* поддерживать premium marketing experience
* не ломаться от добавления новых секций, страниц и интерактивности
* позволять безболезненно подключить формы, lead collection, integrations, CMS и AI later
* оставаться понятной и предсказуемой для одиночной разработки
* быть удобной для AI-assisted workflow через Cursor

### 2.2 Архитектурные принципы

#### 1. Server-first by default

По умолчанию страницы, layout, SEO, контентные блоки и data fetching должны быть серверными.

На клиент переносится только то, что действительно требует браузера:

* scroll-based interactions
* reveal animations
* parallax
* сложное медиа-поведение
* формы с client UX enhancement
* AI/quiz-интерфейсы

Это даёт:

* меньше JS на старте
* лучше initial load
* лучше SEO
* чище границы между статикой, логикой и интерактивом

#### 2. Thin app layer

Папка `app/` не должна превращаться в место, где лежит весь проект.

`app/` отвечает только за:

* routing
* layouts
* metadata
* route groups
* special files (`sitemap.ts`, `robots.ts`, `not-found.tsx`, `global-error.tsx`)
* route handlers / API endpoints

#### 3. Sections отдельно от features

Нужно разделять:

* **sections** — крупные визуально-смысловые блоки страницы
* **features** — интерактивные бизнес-сценарии

Пример:

* `HeroSection` — section
* `LeadCaptureForm` — feature
* `SelectedWorkSection` — section
* `AiBriefAssistant` — feature

#### 4. Контент отдельно от UI

Продающие тексты, services, trust-блоки, FAQ, CTA и content model не должны жить прямо в JSX.

На старте проект должен иметь отдельный content layer.

Это нужно для:

* удобной редакции контента
* поддержки нескольких CTA-вариантов
* более чистого UI-кода
* лёгкого перехода на CMS позже

#### 5. Интеграции только через adapters

Никакой прямой работы с Telegram / email provider / CRM / AI provider из UI или page-level компонентов.

Нужна схема:

`UI -> feature action -> service -> provider adapter`

Это даст:

* заменяемость интеграций
* тестируемость
* меньше хаоса
* проще поддерживать через Cursor

#### 6. Typed boundaries everywhere

Валидация и типизация должны быть на всех входах:

* формы
* query params
* CMS payloads
* API input/output
* AI input/output
* env variables
* webhook payloads

#### 7. Documentation-first repository

Репозиторий должен содержать не только код, но и проектные документы:

* architecture
* content model
* feature specs
* test scenarios
* integration notes
* launch checklist

Это особенно важно для проекта, который развивается через AI-assisted workflow.

---

### 2.3 Архитектурные слои

Рекомендуемая модель слоёв:

#### Layer 1. App / Routing Layer

Отвечает за маршруты и композицию страниц.

Содержит:

* `app/layout.tsx`
* route groups
* page files
* metadata files
* route handlers
* error/not-found/loading files

Не должен содержать:

* тяжёлую бизнес-логику
* сырые integration calls
* большие куски повторяемого UI

#### Layer 2. Presentation Layer

Содержит:

* `components/ui`
* `components/layout`
* `sections/*`

Это визуальный слой проекта.

#### Layer 3. Feature Layer

Содержит интерактивные сценарии:

* contact form
* lead capture
* consultation request
* service selector
* AI brief assistant
* filters / calculators / interactive widgets

Каждая feature должна иметь свои:

* components
* schemas
* actions
* services
* types
* tests

#### Layer 4. Server Layer

Содержит:

* server actions
* route handlers
* service layer
* repositories
* integrations
* orchestration logic

Это основной слой full-stack логики.

#### Layer 5. Content / Config Layer

Содержит:

* site settings
* navigation
* homepage content
* services content
* FAQ content / objections content
* work summary
* SEO defaults
* feature flags

Идея: контент управляется как данные, а не как случайные строки в компонентах.

---

### 2.4 Data flow

#### Контентные страницы

`page.tsx -> query/content source -> section props -> render`

#### Формы

`Form UI -> validation -> server action -> service -> storage/integrations -> result`

#### Вебхуки

`route.ts -> payload validation -> service -> repository/logging/revalidation`

#### AI flows

`UI -> API/action -> AI service -> provider adapter -> parsed structured result -> UI`

Главный принцип: UI не работает напрямую с внешними сервисами.

---

### 2.5 Recommended stack

#### Core

* Next.js (App Router)
* TypeScript
* Tailwind CSS

#### Validation / contracts

* Zod

#### Forms

* native forms + Server Actions by default
* React Hook Form only if появится сложная client-side логика или multi-step flow

#### Animations

* Framer Motion для основной UI-анимации и reveal interactions
* GSAP только точечно, если действительно нужны сложные scroll timelines или cinematic sections

#### Content

* local typed content для MVP
* MDX только если появятся long-form case studies / articles
* CMS later only if контента станет много и он будет часто меняться

#### Leads / backend

* server actions / route handlers
* email provider
* persistent lead storage
* optional Telegram / CRM / Notion / Airtable / database layer

#### Observability

* error tracking
* structured server logging
* basic analytics events

#### Testing

* Vitest / unit tests where useful
* Playwright для ключевых e2e сценариев

---

## 3. Folder Structure

Ниже recommended structure для проекта.

```txt
/
├─ docs/
│  ├─ architecture.md
│  ├─ content-model.md
│  ├─ sitemap.md
│  ├─ page-structure.md
│  ├─ messaging.md
│  ├─ visual-direction.md
│  ├─ tech-definition.md
│  ├─ test-strategy.md
│  ├─ qa-checklist.md
│  ├─ launch-checklist.md
│  ├─ feature-specs/
│  │  ├─ homepage.md
│  │  ├─ contact-form.md
│  │  ├─ lead-capture.md
│  │  ├─ services-page.md
│  │  └─ ai-brief-assistant.md
│  └─ prompt-pack/
│     ├─ v0-homepage.md
│     ├─ v0-sections.md
│     └─ cursor-rules.md
│
├─ public/
│  ├─ images/
│  ├─ videos/
│  ├─ icons/
│  ├─ textures/
│  └─ fonts/
│
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ page.tsx
│  │  │  ├─ services/page.tsx
│  │  │  ├─ work/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ contact/page.tsx
│  │  │  └─ privacy-policy/page.tsx
│  │  ├─ api/
│  │  │  ├─ leads/route.ts
│  │  │  ├─ contact/route.ts
│  │  │  ├─ ai/
│  │  │  │  ├─ consult/route.ts
│  │  │  │  └─ scope/route.ts
│  │  │  └─ webhooks/
│  │  │     ├─ cms/route.ts
│  │  │     ├─ crm/route.ts
│  │  │     └─ email/route.ts
│  │  ├─ layout.tsx
│  │  ├─ global-error.tsx
│  │  ├─ not-found.tsx
│  │  ├─ robots.ts
│  │  ├─ sitemap.ts
│  │  └─ opengraph-image.tsx
│  │
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ layout/
│  │  ├─ motion/
│  │  ├─ media/
│  │  └─ icons/
│  │
│  ├─ sections/
│  │  ├─ home/
│  │  │  ├─ hero/
│  │  │  ├─ proof-strip/
│  │  │  ├─ services-preview/
│  │  │  ├─ selected-work/
│  │  │  ├─ interactive-build-flow/
│  │  │  ├─ operating-system/
│  │  │  └─ contact-cta/
│  │  ├─ services/
│  │  ├─ work/
│  │  ├─ about/
│  │  ├─ faq/
│  │  └─ contact/
│  │
│  ├─ features/
│  │  ├─ lead-capture/
│  │  │  ├─ components/
│  │  │  ├─ actions/
│  │  │  ├─ schemas/
│  │  │  ├─ services/
│  │  │  ├─ types/
│  │  │  └─ tests/
│  │  ├─ contact-form/
│  │  ├─ consultation-request/
│  │  ├─ service-selector/
│  │  └─ ai-brief/
│  │
│  ├─ entities/
│  │  ├─ lead/
│  │  ├─ service/
│  │  ├─ case-study/
│  │  ├─ faq/
│  │  └─ testimonial/
│  │
│  ├─ content/
│  │  ├─ site-settings.ts
│  │  ├─ navigation.ts
│  │  ├─ homepage.ts
│  │  ├─ services.ts
│  │  ├─ work.ts
│  │  ├─ faq.ts
│  │  ├─ contact.ts
│  │  └─ seo/
│  │     ├─ defaults.ts
│  │     └─ pages.ts
│  │
│  ├─ server/
│  │  ├─ actions/
│  │  ├─ queries/
│  │  ├─ services/
│  │  ├─ repositories/
│  │  ├─ integrations/
│  │  │  ├─ email/
│  │  │  ├─ crm/
│  │  │  ├─ analytics/
│  │  │  ├─ cms/
│  │  │  └─ ai/
│  │  └─ logging/
│  │
│  ├─ lib/
│  │  ├─ env/
│  │  ├─ validation/
│  │  ├─ seo/
│  │  ├─ analytics/
│  │  ├─ media/
│  │  ├─ utils/
│  │  ├─ constants/
│  │  └─ helpers/
│  │
│  ├─ hooks/
│  ├─ styles/
│  ├─ types/
│  └─ tests/
│     ├─ unit/
│     ├─ integration/
│     └─ e2e/
│
├─ .env.example
├─ next.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

### 3.1 Логика этой структуры

#### `app/`

Только маршруты и специальные entry points framework.

#### `components/`

Базовые reusable pieces.

#### `sections/`

Крупные блоки, из которых собираются страницы.

#### `features/`

Use-case oriented интерактивность.

#### `content/`

Контентная модель и structured data layer.

#### `server/`

Все серверные сценарии, интеграции, orchestration.

#### `docs/`

Source of truth для architecture / content / feature decisions.

---

### 3.2 Naming conventions

#### Папки

* `kebab-case`

#### React components

* `PascalCase.tsx`

#### Hooks

* `use-something.ts`

#### Schemas

* `something.schema.ts`

#### Actions

* `submit-contact-form.action.ts`
* `create-lead.action.ts`

#### Queries

* `get-homepage-data.query.ts`
* `get-services-list.query.ts`

#### Services

* `lead.service.ts`
* `contact.service.ts`
* `ai-brief.service.ts`

#### Providers / adapters

* `resend.provider.ts`
* `telegram.provider.ts`
* `openai.provider.ts`

#### Types

* `lead.types.ts`
* `service.types.ts`

Главное правило: имя файла должно сразу говорить, что это за сущность и за что она отвечает.

---

## 4. Technical Decisions

### 4.1 Rendering model

#### Recommended

* server rendering по умолчанию
* client components только там, где реально нужен browser API или stateful UX
* dynamic imports для тяжёлых motion/media частей
* progressive enhancement для интерактивных сценариев

#### Не рекомендуется

* делать всю homepage client-side
* завязывать layout на client state без необходимости
* грузить тяжёлые анимационные библиотеки globally

---

### 4.2 Компонентная стратегия

Рекомендуемая иерархия:

#### UI primitives

Простые переиспользуемые элементы:

* Button
* Input
* Textarea
* Container
* SectionShell
* Grid
* Badge
* MediaFrame
* Reveal
* Eyebrow

#### Layout components

* Header
* Footer
* PageShell
* SectionHeader
* MaxWidthWrapper

#### Section components

* HomeHeroSection
* SelectedWorkSection
* ServicesPreviewSection
* TrustSection
* ContactCtaSection

#### Feature components

* LeadCaptureForm
* ContactForm
* ServiceSelector
* AiBriefAssistant

Ключевой принцип: **component responsibility must stay narrow**.

---

### 4.3 Content layer

#### Для MVP

Использовать local typed content:

* `content/homepage.ts`
* `content/services.ts`
* `content/faq.ts`
* `content/navigation.ts`

#### Почему это правильно на старте

* быстрее запуск
* нет лишней инфраструктуры
* удобнее контролировать тексты
* проще поддерживать consistency
* нет CMS-overhead

#### Когда стоит переходить на CMS

* кейсов станет много
* появится блог
* контент станет часто обновляться
* нужен visual editing workflow
* нужно редактирование не только разработчиком

#### Правило

Сначала content model, потом CMS. Не наоборот.

---

### 4.4 Forms handling

#### Recommended MVP flow

* HTML form / React form UI
* client-side UX validation only as enhancement
* основная валидация на server side
* server action или route handler
* anti-spam layer
* lead storage
* email notification
* analytics event

#### Что должно быть в любой форме

* schema validation
* honeypot
* rate limiting
* expected success/error state
* понятные тексты ошибок
* резервный канал сохранения заявки

#### Lead handling strategy

Минимальный production-ready сценарий:

1. сохранить лид в persistent storage
2. отправить email уведомление
3. optional: отправить в Telegram/CRM/Notion
4. записать analytics event

#### Ошибка, которой нужно избежать

Не хранить заявки только в письмах.

---

### 4.5 Data layer

Для marketing-сайта data layer должен быть лёгким, но структурированным.

#### MVP

* typed content files
* простые server queries
* minimal storage для leads

#### Later

* CMS queries
* database-backed leads
* segmentation / lead scoring
* content relations

#### Рекомендуемое правило

Всё входящее или изменяемое — проходит через schema + service layer.

---

### 4.6 Integration strategy

Интеграции делаются через providers/adapters и вызываются только из server layer.

Пример структуры:

```txt
server/
  integrations/
    email/resend.provider.ts
    notifications/telegram.provider.ts
    crm/notion.provider.ts
    ai/openai.provider.ts
```

Над интеграциями должен быть service layer:

```txt
server/
  services/
    lead.service.ts
    contact.service.ts
    consultation.service.ts
    ai-brief.service.ts
```

#### Почему так правильно

* можно заменить провайдера без переписывания UI
* проще тестировать
* меньше vendor lock-in
* integration logic не расползается по проекту

---

### 4.7 Media-heavy homepage

Главная страница у тебя будет media-heavy, поэтому hero нужно проектировать как отдельную подсистему.

#### Рекомендуемый подход

* server-rendered shell
* lightweight poster/preview first
* controlled hydration
* lazy loading тяжёлого media
* mobile-specific fallbacks
* reduced-motion support
* capability-aware effects

#### Для hero важно предусмотреть

* preload только критичных ресурсов
* видео только если оно реально усиливает первый экран
* fallback image / poster
* отключение тяжёлых motion-сценариев на слабых девайсах
* отсутствие layout shift

#### Practical rule

Не герой ради героя. Media обязано усиливать perception, а не просто быть тяжёлым украшением.

---

### 4.8 Animations

#### Recommended motion stack

* Framer Motion для большинства UI-анимаций
* Intersection Observer / lightweight hooks для reveal logic
* GSAP только точечно для truly custom scroll scenes

#### Motion rules

* анимация должна усиливать hierarchy и depth
* не должна мешать считыванию текста
* не должна ломать scroll performance
* должна уважать reduced motion
* на mobile должна быть проще, чем на desktop

#### Не стоит делать

* глобальные тяжелые scroll listeners без нужды
* десятки одновременных анимаций в viewport
* большие blur/filter эффекты на мобильных
* “cinematic everything” на каждой секции

---

### 4.9 Performance

Performance должен быть зашит в архитектуру, а не доделываться потом.

#### Обязательные решения

* server-first rendering
* minimal client JS
* dynamic import тяжёлых частей
* image optimization
* font optimization
* stable layout
* lazy loading for below-the-fold media
* bundle discipline
* performance budget mindset

#### Особенно важно для этого проекта

* heavy visual direction не должен превращаться в sluggish UX
* perceived performance hero важнее, чем “супер-сложность” анимации
* mobile experience — не вторичный слой, а first-class requirement

---

### 4.10 SEO / discoverability

Архитектурно сразу нужно предусмотреть:

* metadata strategy
* canonical logic
* sitemap
* robots
* structured content model для title/description/OG
* semantic sections
* читаемую heading hierarchy

#### Важно

SEO-слой не должен собираться “потом отдельно”. Он должен быть частью page architecture.

---

### 4.11 AI integrations

AI-фичи стоит рассматривать как отдельный capability layer.

#### Что реально подходит этому проекту

* AI-консультант по выбору услуги
* AI brief assistant
* AI scope pre-estimator
* AI lead qualification helper

#### Архитектурный принцип

AI не должен быть зашит в core rendering flow homepage.

#### Recommended structure

* feature-level UI
* server-side orchestration
* prompt/config isolation
* schema-validated input/output
* logging
* rate limit
* fallback без AI

#### Что не делать в MVP

* сложный chat-agent ради эффекта
* многошаговый orchestration без валидации
* незаметные дорогие background AI flows

---

### 4.12 Observability

Даже личный сайт должен иметь базовую observability.

#### Minimum

* error tracking
* server logs
* lead submission logs
* basic analytics for CTA / form submit / key conversion steps

#### Later

* traces for API routes
* per-feature monitoring
* performance traces for critical interactions

---

### 4.13 Cursor workflow compatibility

Чтобы проект был удобен для Cursor, архитектура должна быть:

* предсказуемой
* модульной
* хорошо документированной
* с узкими зонами ответственности

#### Практические правила

* одна feature = одна понятная папка
* один документ на одну важную систему
* компоненты не должны быть слишком огромными
* не использовать без нужды “магические” shared utils
* держать feature boundaries явными
* писать acceptance criteria до реализации спорных вещей

#### Recommended docs for Cursor workflow

* `docs/architecture.md`
* `docs/content-model.md`
* `docs/test-strategy.md`
* `docs/feature-specs/*.md`
* `docs/prompt-pack/cursor-rules.md`

---

## 5. MVP vs Scalable Setup

### 5.1 Что нужно заложить правильно сразу

#### 1. Структура репозитория

Папки, naming и boundaries надо определить в начале.

#### 2. Server/client границы

Если сразу сделать всё client-side, потом будет больно перерабатывать.

#### 3. Validation layer

Схемы форм, env и API input должны быть с первого дня.

#### 4. Lead pipeline

Заявки надо обрабатывать надёжно сразу.

#### 5. Content model

Даже локальный контент должен иметь структуру.

#### 6. SEO foundation

Metadata, sitemap, robots и semantic page structure должны быть с MVP.

#### 7. Error handling

Нужны error states и basic observability.

---

### 5.2 Что можно упростить в MVP

#### Можно не усложнять сразу:

* полноценную CMS
* dashboard/admin panel
* сложную базу данных
* глобальный state manager
* AI-фичи как core part продукта
* сложную автоматизацию lead routing
* enterprise-grade event bus / queues

#### MVP должен быть простым, но не хаотичным

Идея не в том, чтобы строить “маленький enterprise”.
Идея в том, чтобы избежать тех решений, которые потом болезненно переписывать.

---

### 5.3 Recommended MVP setup

#### Must have

* homepage
* services page
* selected work / work page
* about page
* contact page
* FAQ-layer inside relevant pages
* typed local content
* contact/lead form
* server-side validation
* email notification
* persistent lead storage
* analytics events
* basic error tracking
* базовый SEO слой
* motion system без перегруза

#### Nice to have later

* CMS
* blog
* advanced case studies
* AI brief assistant
* qualification funnel
* CRM sync
* automation/webhooks
* richer integrations

---

### 5.4 Recommended scalable phase

После MVP проект может эволюционировать в следующие направления:

#### Content scaling

* CMS
* case study system
* blog / insights
* dynamic SEO pages

#### Lead scaling

* pipeline storage
* CRM integration
* auto-notifications
* segmentation
* lead scoring

#### Product scaling

* AI assistant
* scope generator
* guided service selection
* project estimator

#### Internal scaling

* dashboard-like internal tools
* content previews
* experiment toggles
* monitoring improvements

---

## 6. Risks / Notes

### 6.1 Главные риски

#### Риск 1. Переусложнить MVP

Можно слишком рано начать строить “архитектуру на вырост” и потерять скорость.

#### Риск 2. Сделать всё client-side ради анимаций

Это убьёт performance и усложнит поддержку.

#### Риск 3. Хранить контент внутри JSX

Это сделает редактирование болезненным.

#### Риск 4. Прямо вызывать внешние сервисы из UI

Это быстро приводит к грязному коду.

#### Риск 5. Ставить визуальный вау-эффект выше UX

Красота не должна ломать читаемость, мобильный опыт и путь к заявке.

#### Риск 6. Добавить AI ради модности

AI должен решать понятную задачу и не усложнять core funnel.

---

### 6.2 Practical notes

#### 1. Главная страница — это не просто набор секций

Её стоит проектировать как orchestrated experience:

* visual rhythm
* reveal logic
* CTA placement
* trust flow
* controlled pacing

#### 2. Формы — критическая часть продукта

Form flow должен быть production-ready раньше, чем AI experiments.

#### 3. Документация — часть архитектуры

Для этого проекта документация не secondary артефакт, а core tool управления качеством.

#### 4. Красивый проект должен быть устойчивым

Премиальный визуал без хорошей архитектуры быстро превращается в хрупкий демонстрационный макет.

---

### 6.3 Финальная рекомендация

Для этого проекта рекомендована следующая формула:

* **full-stack Next.js foundation**
* **server-first architecture**
* **content separated from UI**
* **feature-driven interaction layer**
* **integration adapters**
* **typed validation boundaries**
* **documentation-first workflow**
* **performance-aware motion/media strategy**
* **простое MVP, но с правильно заложенными фундаментальными решениями**

Это даст проект, который:

* выглядит как premium digital product
* остаётся быстрым и поддерживаемым
* удобен для Cursor workflow
* масштабируется в сторону backend/CMS/integrations/AI без архитектурного хаоса

---

## Appendix A. Recommended first implementation order

1. repository setup
2. docs baseline
3. routing skeleton
4. layout system
5. content model
6. homepage sections skeleton
7. media/motion foundation
8. contact form feature
9. lead pipeline
10. SEO/system files
11. analytics and error tracking
12. QA / performance pass

---

## Appendix B. Definition of Done for architecture foundation

Архитектурный фундамент считается готовым, когда:

* структура папок зафиксирована и соблюдается
* app layer остаётся чистым
* контент вынесен из JSX
* есть server-side форма с валидным lead flow
* внешние сервисы подключаются через adapters
* есть базовые docs в `/docs`
* есть error handling strategy
* mobile/performance constraints учтены в реализации hero и motion
* проект понятен без устных пояснений
