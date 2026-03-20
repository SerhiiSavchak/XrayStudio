"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";

const services = {
  en: [
    {
      id: "landing-pages",
      title: "Landing Pages",
      subtitle: "Convert visitors into customers",
      description: "High-converting single pages designed to drive specific actions. Perfect for product launches, service offers, lead generation, and marketing campaigns.",
      forWho: ["Consultants launching new offers", "Businesses running ad campaigns", "SaaS companies promoting features", "Professionals capturing leads"],
      includes: ["Compelling visual design", "Clear value proposition", "Optimized user flow", "Mobile-first approach", "Performance optimization", "Basic SEO setup"],
      timeline: "2-3 weeks",
    },
    {
      id: "business-websites",
      title: "Business Websites",
      subtitle: "Establish credibility and authority",
      description: "Multi-page marketing websites that showcase your business, explain your value, and guide visitors toward taking action. Built for trust and conversion.",
      forWho: ["Service businesses", "Professional firms", "B2B companies", "Local premium businesses"],
      includes: ["5-10+ pages", "Strategic site architecture", "Service/offer presentation", "Trust-building elements", "Contact/inquiry system", "Content structure"],
      timeline: "4-8 weeks",
    },
    {
      id: "portfolio-sites",
      title: "Portfolio & Personal Brand",
      subtitle: "Showcase your expertise",
      description: "Personal websites that position you as an expert in your field. Designed to attract the right opportunities and establish your professional presence.",
      forWho: ["Consultants", "Designers & creatives", "Developers", "Content creators"],
      includes: ["About/story section", "Work showcase", "Services overview", "Blog/content area", "Contact integration", "Professional positioning"],
      timeline: "3-5 weeks",
    },
    {
      id: "redesign",
      title: "Website Redesign",
      subtitle: "Transform your digital presence",
      description: "Modernize outdated websites to reflect your current level. Improve visual appeal, user experience, performance, and conversion effectiveness.",
      forWho: ["Businesses with outdated sites", "Brands that have evolved", "Companies losing leads", "Anyone needing a refresh"],
      includes: ["Current site audit", "New visual direction", "Improved UX/flow", "Content restructuring", "Performance upgrade", "Modern tech implementation"],
      timeline: "4-6 weeks",
    },
  ],
  uk: [
    {
      id: "landing-pages",
      title: "Лендінги",
      subtitle: "Конвертуйте відвідувачів у клієнтів",
      description: "Односторінкові сайти з високою конверсією, створені для досягнення конкретних цілей. Ідеально підходять для запуску продуктів, пропозицій послуг та маркетингових кампаній.",
      forWho: ["Консультанти з новими пропозиціями", "Бізнеси з рекламними кампаніями", "SaaS компанії", "Професіонали для збору лідів"],
      includes: ["Привабливий візуальний дизайн", "Чітка ціннісна пропозиція", "Оптимізований потік користувача", "Mobile-first підхід", "Оптимізація продуктивності", "Базове SEO налаштування"],
      timeline: "2-3 тижні",
    },
    {
      id: "business-websites",
      title: "Бізнес-сайти",
      subtitle: "Встановіть довіру та авторитет",
      description: "Багатосторінкові маркетингові сайти, які демонструють ваш бізнес, пояснюють цінність та спрямовують відвідувачів до дії.",
      forWho: ["Сервісні бізнеси", "Професійні фірми", "B2B компанії", "Локальні преміум бізнеси"],
      includes: ["5-10+ сторінок", "Стратегічна архітектура", "Презентація послуг", "Елементи довіри", "Система контактів", "Структура контенту"],
      timeline: "4-8 тижнів",
    },
    {
      id: "portfolio-sites",
      title: "Портфоліо та Особистий Бренд",
      subtitle: "Продемонструйте свою експертизу",
      description: "Персональні сайти, які позиціонують вас як експерта у своїй галузі та залучають правильні можливості.",
      forWho: ["Консультанти", "Дизайнери та креативники", "Розробники", "Контент-креатори"],
      includes: ["Розділ про себе", "Демонстрація робіт", "Огляд послуг", "Блог/контент", "Інтеграція контактів", "Професійне позиціонування"],
      timeline: "3-5 тижнів",
    },
    {
      id: "redesign",
      title: "Редизайн Сайту",
      subtitle: "Трансформуйте вашу цифрову присутність",
      description: "Модернізуйте застарілі сайти. Покращте візуальну привабливість, користувацький досвід та ефективність конверсії.",
      forWho: ["Бізнеси із застарілими сайтами", "Бренди що еволюціонували", "Компанії що втрачають ліди", "Всі хто потребує оновлення"],
      includes: ["Аудит поточного сайту", "Новий візуальний напрямок", "Покращений UX", "Реструктуризація контенту", "Оновлення продуктивності", "Сучасна реалізація"],
      timeline: "4-6 тижнів",
    },
  ],
  ru: [
    {
      id: "landing-pages",
      title: "Лендинги",
      subtitle: "Конвертируйте посетителей в клиентов",
      description: "Одностраничные сайты с высокой конверсией для достижения конкретных целей. Идеально для запуска продуктов и маркетинговых кампаний.",
      forWho: ["Консультанты с новыми предложениями", "Бизнесы с рекламными кампаниями", "SaaS компании", "Профессионалы для сбора лидов"],
      includes: ["Привлекательный визуальный дизайн", "Четкое ценностное предложение", "Оптимизированный поток пользователя", "Mobile-first подход", "Оптимизация производительности", "Базовая SEO настройка"],
      timeline: "2-3 недели",
    },
    {
      id: "business-websites",
      title: "Бизнес-сайты",
      subtitle: "Установите доверие и авторитет",
      description: "Многостраничные маркетинговые сайты, демонстрирующие ваш бизнес и направляющие посетителей к действию.",
      forWho: ["Сервисные бизнесы", "Профессиональные фирмы", "B2B компании", "Локальные премиум бизнесы"],
      includes: ["5-10+ страниц", "Стратегическая архитектура", "Презентация услуг", "Элементы доверия", "Система контактов", "Структура контента"],
      timeline: "4-8 недель",
    },
    {
      id: "portfolio-sites",
      title: "Портфолио и Личный Бренд",
      subtitle: "Продемонстрируйте свою экспертизу",
      description: "Персональные сайты, позиционирующие вас как эксперта в своей области и привлекающие правильные возможности.",
      forWho: ["Консультанты", "Дизайнеры и креативщики", "Разработчики", "Контент-криейторы"],
      includes: ["Раздел о себе", "Демонстрация работ", "Обзор услуг", "Блог/контент", "Интеграция контактов", "Профессиональное позиционирование"],
      timeline: "3-5 недель",
    },
    {
      id: "redesign",
      title: "Редизайн Сайта",
      subtitle: "Трансформируйте ваше цифровое присутствие",
      description: "Модернизируйте устаревшие сайты. Улучшите визуальную привлекательность, пользовательский опыт и эффективность конверсии.",
      forWho: ["Бизнесы с устаревшими сайтами", "Бренды что эволюционировали", "Компании теряющие лиды", "Все кто нуждается в обновлении"],
      includes: ["Аудит текущего сайта", "Новое визуальное направление", "Улучшенный UX", "Реструктуризация контента", "Обновление производительности", "Современная реализация"],
      timeline: "4-6 недель",
    },
  ],
};

const labels = {
  en: { idealFor: "Ideal For", timeline: "Timeline", includes: "What's Included", discuss: "Discuss This Service" },
  uk: { idealFor: "Ідеально для", timeline: "Терміни", includes: "Що включено", discuss: "Обговорити цю послугу" },
  ru: { idealFor: "Идеально для", timeline: "Сроки", includes: "Что включено", discuss: "Обсудить эту услугу" },
};

export function ServiceDetails() {
  const { locale } = useLocale();
  const localizedServices = services[locale];
  const l = labels[locale];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-24 lg:space-y-40">
          {localizedServices.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="scroll-mt-32"
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm font-medium text-accent tracking-wide uppercase mb-4"
                  >
                    {service.subtitle}
                  </motion.p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
                    {service.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                    {service.description}
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
                        {l.idealFor}
                      </h4>
                      <ul className="space-y-3">
                        {service.forWho.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-2">
                      <div className="px-5 py-3 rounded-xl bg-surface border border-border/50">
                        <span className="text-xs text-muted-foreground block mb-1">{l.timeline}</span>
                        <span className="text-sm font-semibold text-foreground">{service.timeline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 mt-10 text-foreground font-medium hover:text-accent transition-colors duration-300"
                  >
                    {l.discuss}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative p-8 lg:p-10 rounded-3xl bg-surface border border-border/50 h-full">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
                    <div className="relative">
                      <h4 className="text-lg font-semibold text-foreground mb-8">
                        {l.includes}
                      </h4>
                      <ul className="space-y-5">
                        {service.includes.map((item, i) => (
                          <motion.li 
                            key={item} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4"
                          >
                            <div className="shrink-0 w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mt-0.5">
                              <Check className="w-3.5 h-3.5 text-accent" />
                            </div>
                            <span className="text-foreground/80">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
