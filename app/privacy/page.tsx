import { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Xray Studio handles and protects your personal information.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: `When you contact us through our website, we collect the information you provide, including your name, email address, company name, and project details. We may also collect technical information such as your IP address, browser type, and device information through standard web analytics.`,
    },
    {
      title: "How We Use Your Information",
      content: `We use your information to respond to your inquiries, provide our services, and improve our website. Your project details help us understand your needs and prepare relevant proposals. We may also use your email to send occasional updates about our services, but only with your consent.`,
    },
    {
      title: "Information Sharing",
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.`,
    },
    {
      title: "Data Security",
      content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "Cookies and Tracking",
      content: `Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you use our site. You can choose to disable cookies through your browser settings, though this may affect some functionality.`,
    },
    {
      title: "Your Rights",
      content: `You have the right to access, correct, or delete your personal information. You may also request a copy of the data we hold about you. To exercise these rights or ask questions about our privacy practices, please contact us at hello@xraystudio.dev.`,
    },
    {
      title: "Changes to This Policy",
      content: `We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically for any changes.`,
    },
  ];

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Last updated: March 2026
          </p>
          <p className="text-muted-foreground leading-relaxed">
            At Xray Studio, we take your privacy seriously. This policy
            describes how we collect, use, and protect your personal information
            when you visit our website or engage our services.
          </p>
        </div>
      </Section>

      <Section className="pt-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our data
              practices, please contact us at{" "}
              <a
                href="mailto:hello@xraystudio.dev"
                className="text-primary hover:underline"
              >
                hello@xraystudio.dev
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
