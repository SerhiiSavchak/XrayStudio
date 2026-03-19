import { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactFAQ } from "@/components/contact/contact-faq";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to start your project? Get in touch to discuss your website needs. No detailed brief required — just tell me about your goals.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </Section>
      <ContactFAQ />
    </>
  );
}
