import { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatHappensNext } from "@/components/contact/what-happens-next";
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
      <ContactForm />
      <WhatHappensNext />
      <ContactFAQ />
    </>
  );
}
