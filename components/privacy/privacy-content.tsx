"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 2026",
    intro: "At Xray Studio, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you visit our website or engage our services.",
    sections: [
      { title: "Information We Collect", content: "When you contact us through our website, we collect the information you provide, including your name, email address, company name, and project details. We may also collect technical information such as your IP address, browser type, and device information through standard web analytics." },
      { title: "How We Use Your Information", content: "We use your information to respond to your inquiries, provide our services, and improve our website. Your project details help us understand your needs and prepare relevant proposals. We may also use your email to send occasional updates about our services, but only with your consent." },
      { title: "Information Sharing", content: "We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential." },
      { title: "Data Security", content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security." },
      { title: "Cookies and Tracking", content: "Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you use our site. You can choose to disable cookies through your browser settings, though this may affect some functionality." },
      { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information. You may also request a copy of the data we hold about you. To exercise these rights or ask questions about our privacy practices, please contact us at hello@xraystudio.dev." },
      { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically for any changes." },
    ],
    contactTitle: "Contact Us",
    contactText: "If you have any questions about this privacy policy or our data practices, please contact us at",
  },
  uk: {
    title: "Політика конфіденційності",
    lastUpdated: "Останнє оновлення: Березень 2026",
    intro: "У Xray Studio ми серйозно ставимось до вашої конфіденційності. Ця політика описує, як ми збираємо, використовуємо та захищаємо вашу особисту інформацію.",
    sections: [
      { title: "Інформація, яку ми збираємо", content: "Коли ви зв'язуєтесь з нами через наш сайт, ми збираємо інформацію, яку ви надаєте, включаючи ваше ім'я, електронну адресу, назву компанії та деталі проекту. Ми також можемо збирати технічну інформацію через стандартну веб-аналітику." },
      { title: "Як ми використовуємо вашу інформацію", content: "Ми використовуємо вашу інформацію для відповіді на ваші запити, надання наших послуг та покращення нашого сайту. Деталі вашого проекту допомагають нам зрозуміти ваші потреби та підготувати відповідні пропозиції." },
      { title: "Передача інформації", content: "Ми не продаємо, не обмінюємо та не передаємо іншим чином вашу особисту інформацію третім особам. Ми можемо ділитися інформацією з довіреними постачальниками послуг, які допомагають нам в роботі нашого сайту." },
      { title: "Безпека даних", content: "Ми впроваджуємо відповідні заходи безпеки для захисту вашої особистої інформації від несанкціонованого доступу, зміни, розкриття або знищення. Однак жоден метод передачі через Інтернет не є на 100% безпечним." },
      { title: "Cookies та відстеження", content: "Наш сайт може використовувати cookies для покращення вашого досвіду перегляду. Cookies - це невеликі файли, що зберігаються на вашому пристрої. Ви можете вимкнути cookies через налаштування браузера." },
      { title: "Ваші права", content: "Ви маєте право на доступ, виправлення або видалення вашої особистої інформації. Ви також можете запросити копію даних, які ми зберігаємо про вас. Для реалізації цих прав зверніться до нас." },
      { title: "Зміни до цієї політики", content: "Ми можемо час від часу оновлювати цю політику конфіденційності. Будь-які зміни будуть опубліковані на цій сторінці з оновленою датою перегляду." },
    ],
    contactTitle: "Зв'яжіться з нами",
    contactText: "Якщо у вас є питання щодо цієї політики конфіденційності або наших практик роботи з даними, зверніться до нас за адресою",
  },
  ru: {
    title: "Политика конфиденциальности",
    lastUpdated: "Последнее обновление: Март 2026",
    intro: "В Xray Studio мы серьёзно относимся к вашей конфиденциальности. Эта политика описывает, как мы собираем, используем и защищаем вашу личную информацию.",
    sections: [
      { title: "Информация, которую мы собираем", content: "Когда вы связываетесь с нами через наш сайт, мы собираем информацию, которую вы предоставляете, включая ваше имя, электронную почту, название компании и детали проекта. Мы также можем собирать техническую информацию через стандартную веб-аналитику." },
      { title: "Как мы используем вашу информацию", content: "Мы используем вашу информацию для ответа на ваши запросы, предоставления наших услуг и улучшения нашего сайта. Детали вашего проекта помогают нам понять ваши потребности и подготовить соответствующие предложения." },
      { title: "Передача информации", content: "Мы не продаём, не обмениваем и не передаём иным образом вашу личную информацию третьим лицам. Мы можем делиться информацией с доверенными поставщиками услуг, которые помогают нам в работе нашего сайта." },
      { title: "Безопасность данных", content: "Мы внедряем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи через Интернет не является на 100% безопасным." },
      { title: "Cookies и отслеживание", content: "Наш сайт может использовать cookies для улучшения вашего опыта просмотра. Cookies - это небольшие файлы, хранящиеся на вашем устройстве. Вы можете отключить cookies через настройки браузера." },
      { title: "Ваши права", content: "Вы имеете право на доступ, исправление или удаление вашей личной информации. Вы также можете запросить копию данных, которые мы храним о вас. Для реализации этих прав свяжитесь с нами." },
      { title: "Изменения этой политики", content: "Мы можем время от времени обновлять эту политику конфиденциальности. Любые изменения будут опубликованы на этой странице с обновлённой датой пересмотра." },
    ],
    contactTitle: "Свяжитесь с нами",
    contactText: "Если у вас есть вопросы об этой политике конфиденциальности или наших практиках работы с данными, свяжитесь с нами по адресу",
  },
};

export function PrivacyContent() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">{t.title}</h1>
          <p className="text-muted-foreground text-lg mb-4">{t.lastUpdated}</p>
          <p className="text-muted-foreground leading-relaxed">{t.intro}</p>
        </motion.div>

        <div className="space-y-12">
          {t.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-border/50"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.contactTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.contactText}{" "}
              <a href="mailto:hello@xraystudio.dev" className="text-accent hover:underline">
                hello@xraystudio.dev
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
