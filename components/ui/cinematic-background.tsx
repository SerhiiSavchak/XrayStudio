"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface CinematicBackgroundProps {
  variant?: "default" | "intense" | "subtle";
  showGrid?: boolean;
  showMatrix?: boolean;
  showOrbs?: boolean;
  className?: string;
}

// Matrix-style falling code
function MatrixCode({ intensity = 1 }: { intensity?: number }) {
  const columns = Math.floor(12 * intensity);
  const codeChars = "01</>{}[]();:=+-*const";
  
  const columnsData = useMemo(() => 
    [...Array(columns)].map((_, i) => ({
      left: `${5 + (i / columns) * 90}%`,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
      chars: [...Array(25)].map(() => 
        codeChars[Math.floor(Math.random() * codeChars.length)]
      ),
    })), [columns]
  );
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      {columnsData.map((col, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-[10px] text-[rgb(var(--glow-intense))] whitespace-nowrap leading-tight"
          style={{ left: col.left }}
          initial={{ y: "-100%" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            delay: col.delay,
            ease: "linear",
          }}
        >
          {col.chars.map((char, j) => (
            <div key={j} className="my-0.5">{char}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Animated gradient orbs
function GlowOrbs({ variant = "default" }: { variant?: string }) {
  const intensityMap = {
    default: { primary: 0.08, secondary: 0.05 },
    intense: { primary: 0.12, secondary: 0.08 },
    subtle: { primary: 0.05, secondary: 0.03 },
  };
  
  const intensity = intensityMap[variant as keyof typeof intensityMap] || intensityMap.default;
  
  return (
    <>
      {/* Primary orb - top right */}
      <motion.div
        className="absolute -top-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, rgb(var(--glow-intense))/${intensity.primary}, transparent 60%)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary orb - bottom left */}
      <motion.div
        className="absolute -bottom-[35%] -left-[25%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, rgb(var(--glow))/${intensity.secondary}, transparent 60%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh]"
        style={{
          background: `radial-gradient(ellipse at center, rgb(var(--glow-intense))/${intensity.secondary}, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

// Animated grid with scan line
function AnimatedGrid() {
  return (
    <>
      {/* Base grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Grid energy nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[rgb(var(--glow-intense))]"
          style={{
            left: `${15 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 40}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
      
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/20 to-transparent"
        initial={{ top: 0, opacity: 0 }}
        animate={{ 
          top: ["0%", "100%"],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}

export function CinematicBackground({
  variant = "default",
  showGrid = true,
  showMatrix = false,
  showOrbs = true,
  className = "",
}: CinematicBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
      
      {/* Gradient orbs */}
      {showOrbs && <GlowOrbs variant={variant} />}
      
      {/* Grid pattern */}
      {showGrid && <AnimatedGrid />}
      
      {/* Matrix code effect */}
      {showMatrix && <MatrixCode intensity={variant === "intense" ? 1.5 : 1} />}
      
      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(var(--background))/0.3_100%)]" />
    </div>
  );
}

// Export individual components for custom compositions
export { MatrixCode, GlowOrbs, AnimatedGrid };
