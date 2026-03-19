"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-foreground to-muted-foreground/30 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg mb-8 leading-relaxed"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Get in Touch
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-sm">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link
              href="/services"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link
              href="/work"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Work
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link
              href="/about"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link
              href="/contact"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
