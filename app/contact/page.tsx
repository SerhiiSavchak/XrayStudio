import { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactFAQ } from "@/components/contact/contact-faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to start your project? Get in touch to discuss your website needs. No detailed brief required — just tell me about your goals.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactFAQ />
    </>
  );
}
