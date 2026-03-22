"use client";

import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as THREE from "three";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// DIGITAL LAUNCH STAGE HERO
// Premium opening scene for a web development studio
// 5 Objects: Main Browser, Mobile Panel, Deep Background, Glass Layer, Status Chip
// ===========================================

// Camera with smooth cursor-reactive movement
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    targetRef.current.x = mouseRef.current.x * 1.5;
    targetRef.current.y = mouseRef.current.y * 0.8;
    
    camera.position.x += (targetRef.current.x - camera.position.x) * delta * 2;
    camera.position.y += (targetRef.current.y - camera.position.y) * delta * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Premium lighting system
function Lighting({ isDark }: { isDark: boolean }) {
  return (
    <>
      {/* Key light */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.4}
        penumbra={0.8}
        intensity={isDark ? 1.5 : 2}
        color={isDark ? "#a8b8d8" : "#ffffff"}
      />
      {/* Fill light */}
      <spotLight
        position={[-8, 5, 8]}
        angle={0.5}
        penumbra={1}
        intensity={isDark ? 0.6 : 0.8}
        color={isDark ? "#6080b0" : "#e8f0ff"}
      />
      {/* Rim light */}
      <pointLight
        position={[0, 0, -10]}
        intensity={isDark ? 1 : 0.5}
        color={isDark ? "#4060a0" : "#d0e0ff"}
      />
      {/* Ambient */}
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
    </>
  );
}

// OBJECT 1: Main Browser Stage - Large dominant screen with premium website preview
function MainBrowserStage({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      groupRef.current.rotation.y = -0.15 + Math.sin(state.clock.elapsedTime * 0.15) * 0.01;
    }
  });

  const colors = isDark 
    ? { frame: "#0a0c12", screen: "#080a0f", accent: "#1a2540", text: "#ffffff", textMuted: "#8090b0" }
    : { frame: "#f0f2f5", screen: "#ffffff", accent: "#e8ecf2", text: "#0a0c12", textMuted: "#6070a0" };

  return (
    <group ref={groupRef} position={[1.8, 0.3, -2]} rotation={[0.02, -0.15, 0]}>
      {/* Browser frame */}
      <RoundedBox args={[10, 6.5, 0.12]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color={colors.frame} metalness={0.2} roughness={0.8} />
      </RoundedBox>
      
      {/* Glow behind */}
      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[11, 7.5]} />
        <meshBasicMaterial color={colors.accent} transparent opacity={0.4} />
      </mesh>
      
      {/* Browser chrome */}
      <mesh position={[0, 2.9, 0.07]}>
        <planeGeometry args={[9.6, 0.5]} />
        <meshStandardMaterial color={isDark ? "#12151c" : "#e5e8ed"} />
      </mesh>
      
      {/* Traffic lights */}
      {[
        { x: -4.3, color: "#ff5f57" },
        { x: -3.95, color: "#febc2e" },
        { x: -3.6, color: "#28c840" },
      ].map((dot, i) => (
        <mesh key={i} position={[dot.x, 2.9, 0.08]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={dot.color} />
        </mesh>
      ))}
      
      {/* URL bar */}
      <RoundedBox args={[4, 0.28, 0.01]} radius={0.08} position={[0, 2.9, 0.08]}>
        <meshStandardMaterial color={isDark ? "#1a1e28" : "#dce0e8"} />
      </RoundedBox>
      
      {/* Screen content area */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[9.6, 5.3]} />
        <meshStandardMaterial color={colors.screen} />
      </mesh>
      
      {/* Hero section within the website */}
      <mesh position={[0, 1, 0.08]}>
        <planeGeometry args={[9, 2.2]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.1} />
      </mesh>
      
      {/* Large headline text */}
      <Text
        position={[-2.5, 1.3, 0.1]}
        fontSize={0.5}
        color={colors.text}
        anchorX="left"
        font="/fonts/Geist-Bold.ttf"
        maxWidth={5}
      >
        Premium Digital
      </Text>
      <Text
        position={[-2.5, 0.7, 0.1]}
        fontSize={0.5}
        color={colors.textMuted}
        anchorX="left"
        font="/fonts/Geist-Bold.ttf"
        maxWidth={5}
      >
        Experiences
      </Text>
      
      {/* CTA button */}
      <RoundedBox args={[1.6, 0.4, 0.02]} radius={0.12} position={[-3.2, 0.1, 0.1]}>
        <meshStandardMaterial color={colors.text} />
      </RoundedBox>
      
      {/* Right visual area - abstract shape */}
      <mesh position={[2.8, 0.9, 0.09]}>
        <planeGeometry args={[3.2, 2.4]} />
        <meshStandardMaterial color={isDark ? "#1a2030" : "#e0e5ed"} emissive={isDark ? "#252d45" : "#c8d0e0"} emissiveIntensity={0.15} />
      </mesh>
      
      {/* Bottom feature cards */}
      {[-2.8, 0, 2.8].map((x, i) => (
        <RoundedBox key={i} args={[2.6, 1.3, 0.02]} radius={0.08} position={[x, -1.6, 0.08]}>
          <meshStandardMaterial color={isDark ? "#0c0f15" : "#f5f7fa"} emissive={isDark ? "#151a28" : "#e8ecf2"} emissiveIntensity={0.1} />
        </RoundedBox>
      ))}
      
      {/* Subtle reflection sweep */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[9.6, 5.3]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isDark ? 0.015 : 0.03} />
      </mesh>
    </group>
  );
}

// OBJECT 2: Mobile Preview Panel - Tall phone screen showing responsive version
function MobilePreviewPanel({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 0.35 + 1) * 0.1;
      groupRef.current.rotation.y = 0.1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  const colors = isDark
    ? { frame: "#0c0e14", screen: "#080a0f", accent: "#1e2840" }
    : { frame: "#e8eaef", screen: "#ffffff", accent: "#e0e5ed" };

  return (
    <group ref={groupRef} position={[-3.5, 0.1, 1]} rotation={[0, 0.1, 0.02]}>
      {/* Phone frame */}
      <RoundedBox args={[2.2, 4.5, 0.1]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color={colors.frame} metalness={0.3} roughness={0.7} />
      </RoundedBox>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2, 4.1]} />
        <meshStandardMaterial color={colors.screen} />
      </mesh>
      
      {/* Status bar */}
      <mesh position={[0, 1.85, 0.07]}>
        <planeGeometry args={[1.8, 0.15]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      
      {/* Mobile hero section */}
      <mesh position={[0, 0.8, 0.07]}>
        <planeGeometry args={[1.9, 1.5]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.1} />
      </mesh>
      
      {/* Mobile text placeholders */}
      <mesh position={[0, 1.1, 0.08]}>
        <planeGeometry args={[1.4, 0.15]} />
        <meshBasicMaterial color={isDark ? "#ffffff" : "#0a0c12"} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.2, 0.85, 0.08]}>
        <planeGeometry args={[1, 0.08]} />
        <meshBasicMaterial color={isDark ? "#ffffff" : "#0a0c12"} transparent opacity={0.5} />
      </mesh>
      
      {/* Mobile CTA */}
      <RoundedBox args={[1.2, 0.28, 0.01]} radius={0.1} position={[0, 0.5, 0.08]}>
        <meshStandardMaterial color={isDark ? "#ffffff" : "#0a0c12"} />
      </RoundedBox>
      
      {/* Mobile cards */}
      {[-0.6, 0.6].map((y, i) => (
        <RoundedBox key={i} args={[1.8, 0.8, 0.01]} radius={0.06} position={[0, y - 0.8, 0.07]}>
          <meshStandardMaterial color={isDark ? "#0f1218" : "#f0f2f5"} />
        </RoundedBox>
      ))}
    </group>
  );
}

// OBJECT 3: Deep Background Panel - Atmospheric depth layer
function DeepBackgroundPanel({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[4, 0.5, -10]} rotation={[0, -0.12, 0]}>
      <planeGeometry args={[12, 8]} />
      <meshStandardMaterial
        color={isDark ? "#0a0c14" : "#e8ecf2"}
        emissive={isDark ? "#101828" : "#d0d8e8"}
        emissiveIntensity={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// OBJECT 4: Foreground Glass Layer - Cinematic depth accent
function ForegroundGlassLayer({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = 5.5 + Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
      meshRef.current.rotation.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[5.5, 0.5, 3]} rotation={[0.03, -0.3, 0.02]}>
      <planeGeometry args={[3, 6]} />
      <meshStandardMaterial
        color={isDark ? "#1a2030" : "#e0e8f0"}
        transparent
        opacity={isDark ? 0.12 : 0.2}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// OBJECT 5: Status Chip - Small floating product label
function StatusChip({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = 2.8 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[6.5, 2.8, 0]} rotation={[0, -0.15, 0]}>
      <RoundedBox args={[2.4, 0.5, 0.04]} radius={0.15}>
        <meshStandardMaterial
          color={isDark ? "#101420" : "#f0f2f5"}
          emissive={isDark ? "#1e2840" : "#e0e5f0"}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.14}
        color={isDark ? "#8090b0" : "#4050a0"}
        anchorX="center"
        font="/fonts/GeistMono-Regular.ttf"
      >
        Strategy / Design / Code
      </Text>
    </group>
  );
}

// Atmospheric particles
function AtmosphericParticles({ isDark }: { isDark: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={isDark ? "#5060a0" : "#8090c0"}
        transparent
        opacity={isDark ? 0.35 : 0.25}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene
function Scene({ isDark }: { isDark: boolean }) {
  const bgColor = isDark ? "#060608" : "#f8f9fb";
  const fogColor = isDark ? "#060608" : "#f0f2f5";
  
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[fogColor, 12, 35]} />
      
      <Lighting isDark={isDark} />
      <CameraRig />
      
      {/* Atmospheric layer */}
      <AtmosphericParticles isDark={isDark} />
      
      {/* Scene objects - ordered back to front */}
      <DeepBackgroundPanel isDark={isDark} />
      <MainBrowserStage isDark={isDark} />
      <MobilePreviewPanel isDark={isDark} />
      <StatusChip isDark={isDark} />
      <ForegroundGlassLayer isDark={isDark} />
    </>
  );
}

// Staggered text reveal animation
const textRevealVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.2,
      delay: 0.8 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 1.4 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms - hero recedes on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 28]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0.4]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const bgColor = isDark ? "#060608" : "#f8f9fb";

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "200vh", backgroundColor: bgColor }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Hero frame that scales and gains border radius on scroll */}
        <motion.div
          style={{
            scale: heroScale,
            y: heroY,
            borderRadius: heroBorderRadius,
          }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* 3D Canvas Scene */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 10], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <Scene isDark={isDark} />
              </Suspense>
            </Canvas>
          </div>

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(6,6,8,0.5) 75%, rgba(6,6,8,0.9) 100%)"
                : "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(248,249,251,0.4) 75%, rgba(248,249,251,0.85) 100%)",
            }}
          />

          {/* Bottom gradient for text area */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to top, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.6) 50%, transparent 100%)"
                : "linear-gradient(to top, rgba(248,249,251,0.95) 0%, rgba(248,249,251,0.5) 50%, transparent 100%)",
            }}
          />
          
          {/* Film grain */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.015 : 0.008,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Text overlay - using original font-display (Syne) */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 flex items-end pb-16 lg:pb-24 xl:pb-28 pointer-events-none"
          >
            <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pointer-events-auto">
              <div className="max-w-3xl">
                {/* Headline - original font-display (Syne) */}
                <div className="overflow-hidden mb-2 lg:mb-3">
                  <motion.h1
                    custom={0}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.03em] leading-[0.95] text-[rgb(var(--foreground))]"
                  >
                    We craft digital
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-2 lg:mb-3">
                  <motion.h1
                    custom={1}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.03em] leading-[0.95] text-[rgb(var(--muted-foreground))]"
                  >
                    experiences that
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    custom={2}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.03em] leading-[0.95] text-[rgb(var(--foreground))]"
                  >
                    <span className="italic font-medium">perform</span>
                  </motion.h1>
                </div>

                {/* Supporting text */}
                <motion.p
                  custom={0}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  className="text-base lg:text-lg text-[rgb(var(--muted-foreground))] max-w-lg mb-8 lg:mb-10 leading-relaxed"
                >
                  Strategic design & development studio creating premium digital products for ambitious brands.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity duration-300"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] text-sm font-medium tracking-wide transition-colors duration-300"
                  >
                    <span>View Our Work</span>
                  </Link>
                </motion.div>

                {/* Trust row */}
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  className="flex items-center gap-6 mt-10 lg:mt-14"
                >
                  <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(var(--foreground))]/60" />
                    <span>15+ Projects Delivered</span>
                  </div>
                  <div className="w-px h-4 bg-[rgb(var(--border))]" />
                  <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(var(--foreground))]/60" />
                    <span>100% Client Satisfaction</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
