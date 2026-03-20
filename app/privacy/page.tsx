import { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Xray Studio handles and protects your personal information.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
