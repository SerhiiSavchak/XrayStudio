"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/services", key: "services" as const },
  { href: "/work", key: "work" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-3 glass border-b border-[rgb(var(--border))]"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 group"
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-[rgb(var(--foreground))] transition-colors group-hover:text-[rgb(var(--muted-foreground))]">
                xray
              </span>
              <span className="text-[rgb(var(--muted-foreground))] transition-colors group-hover:text-[rgb(var(--foreground))]">
                .studio
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors group"
              >
                <span className="relative z-10">{t.nav[item.key]}</span>
                <span className="absolute inset-0 rounded-full bg-[rgb(var(--surface-2))] scale-0 group-hover:scale-100 transition-transform origin-center" />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsThemeOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors rounded-full hover:bg-[rgb(var(--surface-2))]"
              >
                <span>{localeNames[locale]}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform",
                    isLangOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 py-1.5 px-1 min-w-[100px] rounded-xl surface-2 border border-[rgb(var(--border))] shadow-xl"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLocale(l as Locale);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-left text-sm rounded-lg transition-colors",
                          locale === l
                            ? "bg-[rgb(var(--surface-3))] text-[rgb(var(--foreground))]"
                            : "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--surface-3))]"
                        )}
                      >
                        {localeNames[l as Locale]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsThemeOpen(!isThemeOpen);
                  setIsLangOpen(false);
                }}
                className="flex items-center justify-center w-10 h-10 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors rounded-full hover:bg-[rgb(var(--surface-2))]"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Moon className="w-[18px] h-[18px]" />
                ) : (
                  <Sun className="w-[18px] h-[18px]" />
                )}
              </button>
              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 py-1.5 px-1 min-w-[120px] rounded-xl surface-2 border border-[rgb(var(--border))] shadow-xl"
                  >
                    {[
                      { value: "light" as const, icon: Sun, label: t.theme.light },
                      { value: "dark" as const, icon: Moon, label: t.theme.dark },
                      { value: "system" as const, icon: Monitor, label: t.theme.system },
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => {
                          setTheme(value);
                          setIsThemeOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-lg transition-colors",
                          theme === value
                            ? "bg-[rgb(var(--surface-3))] text-[rgb(var(--foreground))]"
                            : "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--surface-3))]"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 text-sm font-medium bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full hover:opacity-90 transition-opacity"
            >
              {t.cta.primary}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-10 lg:hidden flex items-center justify-center w-10 h-10 text-[rgb(var(--foreground))]"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[rgb(var(--background))]"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[rgb(var(--surface-1))] border-l border-[rgb(var(--border))] p-8 pt-24 flex flex-col"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-3 text-2xl font-display font-semibold text-[rgb(var(--foreground))] hover:text-[rgb(var(--muted-foreground))] transition-colors"
                    >
                      {t.nav[item.key]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-[rgb(var(--border))]">
                {/* Mobile Language */}
                <div className="flex gap-2 mb-4">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLocale(l as Locale)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                        locale === l
                          ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                          : "bg-[rgb(var(--surface-2))] text-[rgb(var(--muted-foreground))]"
                      )}
                    >
                      {localeNames[l as Locale]}
                    </button>
                  ))}
                </div>

                {/* Mobile Theme */}
                <div className="flex gap-2 mb-6">
                  {[
                    { value: "light" as const, icon: Sun },
                    { value: "dark" as const, icon: Moon },
                    { value: "system" as const, icon: Monitor },
                  ].map(({ value, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-full transition-colors",
                        theme === value
                          ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                          : "bg-[rgb(var(--surface-2))] text-[rgb(var(--muted-foreground))]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full py-4 text-center text-base font-medium bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full"
                >
                  {t.cta.primary}
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdowns */}
      {(isLangOpen || isThemeOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLangOpen(false);
            setIsThemeOpen(false);
          }}
        />
      )}
    </>
  );
}
