"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const projects = {
  en: [
    {
      id: 1,
      title: "Meridian Consulting",
      category: "Business Website",
      year: "2024",
      description: "Premium multi-page website for a management consulting firm. Focus on trust, expertise showcase, and qualified lead generation.",
      challenge: "Position a new consulting firm as premium in a competitive market.",
      solution: "Clean, sophisticated design with strong case study presentations.",
      results: ["47% increase in lead quality", "2.3x longer sessions", "Premium positioning"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
      tags: ["Strategy", "Multi-page", "Lead Generation"],
      featured: true,
    },
    {
      id: 2,
      title: "Sarah Mitchell",
      category: "Personal Brand",
      year: "2024",
      description: "High-converting landing page for a B2B SaaS marketing consultant. Bold visual approach with optimized conversion flow.",
      challenge: "Differentiate from generic consultant sites with premium positioning.",
      solution: "Distinctive visual identity with strong testimonials and clear CTAs.",
      results: ["35% booking conversion", "Distinctive presence", "3x qualified inquiries"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=900&fit=crop",
      tags: ["Personal Brand", "Landing Page", "Conversion"],
      featured: true,
    },
    {
      id: 3,
      title: "Nexus Digital Studio",
      category: "Agency Website",
      year: "2023",
      description: "Modern portfolio for a creative agency specializing in brand identity. Focus on immersive project showcases and visual storytelling.",
      challenge: "Let the work speak for itself while maintaining agency positioning.",
      solution: "Large-format case studies with smooth transitions and editorial layout.",
      results: ["Enhanced credibility", "Improved client quality", "Award-winning design"],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&h=900&fit=crop",
      tags: ["Portfolio", "Animation", "Case Studies"],
      featured: true,
    },
  ],
  uk: [
    {
      id: 1,
      title: "Meridian Consulting",
      category: "Бізнес-сайт",
      year: "2024",
      description: "Преміум багатосторінковий сайт для консалтингової фірми. Фокус на довірі, демонстрації експертизи та генерації якісних лідів.",
      challenge: "Позиціонувати нову консалтингову фірму як преміум на конкурентному ринку.",
      solution: "Чистий, витончений дизайн з сильною презентацією кейсів.",
      results: ["47% збільшення якості лідів", "2.3x довші сесії", "Преміум позиціонування"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
      tags: ["Стратегія", "Багатосторінковий", "Генерація лідів"],
      featured: true,
    },
    {
      id: 2,
      title: "Sarah Mitchell",
      category: "Особистий Бренд",
      year: "2024",
      description: "Висококонверсійний лендінг для B2B SaaS маркетинг консультанта. Сміливий візуальний підхід з оптимізованим потоком конверсії.",
      challenge: "Виділитися серед звичайних консультантських сайтів з преміум позиціонуванням.",
      solution: "Виразна візуальна ідентичність з сильними відгуками та чіткими CTA.",
      results: ["35% конверсія бронювань", "Виразна присутність", "3x якісніші запити"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=900&fit=crop",
      tags: ["Особистий бренд", "Лендінг", "Конверсія"],
      featured: true,
    },
    {
      id: 3,
      title: "Nexus Digital Studio",
      category: "Сайт Агенції",
      year: "2023",
      description: "Сучасне портфоліо для креативної агенції, що спеціалізується на бренд-ідентичності. Фокус на імерсивних проектах та візуальному сторітелінгу.",
      challenge: "Дозволити роботам говорити за себе зберігаючи позиціонування агенції.",
      solution: "Великоформатні кейси з плавними переходами та редакційним макетом.",
      results: ["Покращена довіра", "Краща якість клієнтів", "Нагороджений дизайн"],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&h=900&fit=crop",
      tags: ["Портфоліо", "Анімація", "Кейси"],
      featured: true,
    },
  ],
  ru: [
    {
      id: 1,
      title: "Meridian Consulting",
      category: "Бизнес-сайт",
      year: "2024",
      description: "Премиум многостраничный сайт для консалтинговой фирмы. Фокус на доверии, демонстрации экспертизы и генерации качественных лидов.",
      challenge: "Позиционировать новую консалтинговую фирму как премиум на конкурентном рынке.",
      solution: "Чистый, изысканный дизайн с сильной презентацией кейсов.",
      results: ["47% рост качества лидов", "2.3x длиннее сессии", "Премиум позиционирование"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
      tags: ["Стратегия", "Многостраничный", "Генерация лидов"],
      featured: true,
    },
    {
      id: 2,
      title: "Sarah Mitchell",
      category: "Личный Бренд",
      year: "2024",
      description: "Высококонверсионный лендинг для B2B SaaS маркетинг консультанта. Смелый визуальный подход с оптимизированным потоком конверсии.",
      challenge: "Выделиться среди обычных консультантских сайтов с премиум позиционированием.",
      solution: "Выразительная визуальная идентичность с сильными отзывами и четкими CTA.",
      results: ["35% конверсия бронирований", "Выразительное присутствие", "3x качественнее запросы"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=900&fit=crop",
      tags: ["Личный бренд", "Лендинг", "Конверсия"],
      featured: true,
    },
    {
      id: 3,
      title: "Nexus Digital Studio",
      category: "Сайт Агентства",
      year: "2023",
      description: "Современное портфолио для креативного агентства, специализирующегося на бренд-идентичности. Фокус на иммерсивных проектах и визуальном сторителлинге.",
      challenge: "Позволить работам говорить за себя сохраняя позиционирование агентства.",
      solution: "Крупноформатные кейсы с плавными переходами и редакционной версткой.",
      results: ["Улучшенное доверие", "Лучшее качество клиентов", "Награжденный дизайн"],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&h=900&fit=crop",
      tags: ["Портфолио", "Анимация", "Кейсы"],
      featured: true,
    },
  ],
};

const labels = {
  en: { challenge: "Challenge", solution: "Solution", results: "Results" },
  uk: { challenge: "Виклик", solution: "Рішення", results: "Результати" },
  ru: { challenge: "Вызов", solution: "Решение", results: "Результаты" },
};

export function FeaturedProjects() {
  const { locale } = useLocale();
  const localizedProjects = projects[locale];
  const l = labels[locale];

  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-12 lg:space-y-20">
          {localizedProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden bg-surface border border-border/50 hover:border-accent/30 transition-all duration-500">
                <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                  
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
                    {project.year}
                  </div>
                </div>
                
                <div className="relative p-8 lg:p-12 -mt-24 lg:-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-accent tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl lg:text-4xl xl:text-5xl font-semibold text-foreground mb-4 flex items-center gap-4">
                    {project.title}
                    <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                    {project.description}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                      <h4 className="text-xs font-medium text-accent uppercase tracking-widest mb-3">{l.challenge}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-accent uppercase tracking-widest mb-3">{l.solution}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-accent uppercase tracking-widest mb-3">{l.results}</h4>
                      <ul className="space-y-2">
                        {project.results.map((result, i) => (
                          <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 text-xs font-medium rounded-full bg-surface border border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
