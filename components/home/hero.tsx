"use client";

import { useRef, useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme/context";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

// ===========================================
// CINEMATIC 3D HERO WITH REACT THREE FIBER
// Premium responsive website showcase
// ===========================================

// ----------------------------------------
// DEVICE SCREEN CONTENT COMPONENTS
// Same premium website across all devices
// ----------------------------------------

function DesktopScreenContent({ isDark }: { isDark: boolean }) {
  const colors = {
    bg: isDark ? "#0a0b0e" : "#fefefe",
    chrome: isDark ? "#131419" : "#f5f6f8",
    border: isDark ? "#1f2029" : "#e2e4e8",
    surface: isDark ? "#1a1b20" : "#e4e6ea",
    surfaceAlt: isDark ? "#16171c" : "#eceef0",
    text: isDark ? "#fafafa" : "#0c0c0e",
    accent: isDark ? "#12131a" : "#f0f2f4",
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Browser Chrome */}
      <div
        className="h-7 flex items-center px-3 gap-2 shrink-0"
        style={{ backgroundColor: colors.chrome, borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="flex-1 h-4 rounded mx-6 flex items-center justify-center"
          style={{ backgroundColor: isDark ? "#1a1b20" : "#e8eaed" }}
        >
          <span className="text-[8px] font-mono tracking-wider" style={{ color: isDark ? "#6c6c78" : "#6c6c78" }}>
            aurora.studio
          </span>
        </div>
      </div>

      {/* Website Content */}
      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        {/* Nav */}
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div className="w-16 h-4 rounded" style={{ backgroundColor: colors.surface }} />
          <div className="flex gap-5">
            {[32, 28, 32, 36].map((w, i) => (
              <div key={i} className="h-2.5 rounded" style={{ width: w, backgroundColor: colors.surface }} />
            ))}
          </div>
          <div className="w-16 h-6 rounded-full" style={{ backgroundColor: colors.text }} />
        </div>

        {/* Hero section */}
        <div className="flex-1 flex gap-8">
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-2 mb-4">
              <div className="h-7 w-[85%] rounded" style={{ backgroundColor: colors.surface }} />
              <div className="h-7 w-[65%] rounded" style={{ backgroundColor: colors.surface }} />
            </div>
            <div className="space-y-1.5 mb-6">
              <div className="h-2 w-[90%] rounded" style={{ backgroundColor: colors.surfaceAlt }} />
              <div className="h-2 w-[70%] rounded" style={{ backgroundColor: colors.surfaceAlt }} />
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-7 rounded-full" style={{ backgroundColor: colors.text }} />
              <div className="w-16 h-7 rounded-full border" style={{ borderColor: colors.border }} />
            </div>
          </div>
          <div className="w-[42%] rounded-lg" style={{ backgroundColor: colors.accent }}>
            <div className="w-full h-full flex items-center justify-center">
              <div 
                className="w-[65%] h-[55%] rounded"
                style={{ 
                  background: `linear-gradient(135deg, ${isDark ? 'rgba(100,140,220,0.2)' : 'rgba(80,100,160,0.12)'} 0%, ${isDark ? 'rgba(140,100,200,0.12)' : 'rgba(120,80,180,0.08)'} 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletScreenContent({ isDark }: { isDark: boolean }) {
  const colors = {
    bg: isDark ? "#0a0b0e" : "#fefefe",
    surface: isDark ? "#1a1b20" : "#e4e6ea",
    surfaceAlt: isDark ? "#16171c" : "#eceef0",
    text: isDark ? "#fafafa" : "#0c0c0e",
    accent: isDark ? "#12131a" : "#f0f2f4",
    muted: isDark ? "#3a3b42" : "#c4c6ca",
  };

  return (
    <div className="w-full h-full p-4 flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Nav */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div className="w-12 h-3 rounded" style={{ backgroundColor: colors.surface }} />
        <div className="flex flex-col gap-1">
          <div className="w-5 h-0.5 rounded-full" style={{ backgroundColor: colors.muted }} />
          <div className="w-5 h-0.5 rounded-full" style={{ backgroundColor: colors.muted }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-1.5 mb-3">
          <div className="h-5 w-[90%] rounded" style={{ backgroundColor: colors.surface }} />
          <div className="h-5 w-[65%] rounded" style={{ backgroundColor: colors.surface }} />
        </div>
        <div className="space-y-1 mb-4">
          <div className="h-1.5 w-[95%] rounded" style={{ backgroundColor: colors.surfaceAlt }} />
          <div className="h-1.5 w-[75%] rounded" style={{ backgroundColor: colors.surfaceAlt }} />
        </div>
        <div className="w-16 h-5 rounded-full" style={{ backgroundColor: colors.text }} />
      </div>

      {/* Visual block */}
      <div className="h-20 rounded-lg shrink-0" style={{ backgroundColor: colors.accent }} />
    </div>
  );
}

function MobileScreenContent({ isDark }: { isDark: boolean }) {
  const colors = {
    bg: isDark ? "#0a0b0e" : "#fefefe",
    surface: isDark ? "#1a1b20" : "#e4e6ea",
    surfaceAlt: isDark ? "#16171c" : "#eceef0",
    text: isDark ? "#fafafa" : "#0c0c0e",
    accent: isDark ? "#12131a" : "#f0f2f4",
    muted: isDark ? "#2a2b32" : "#c4c6ca",
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Dynamic Island */}
      <div className="w-14 h-4 rounded-full bg-black mx-auto mt-2 shrink-0" />

      {/* Content */}
      <div className="flex-1 px-3 pt-4 pb-3 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-1 mb-2">
            <div className="h-4 w-[95%] rounded" style={{ backgroundColor: colors.surface }} />
            <div className="h-4 w-[70%] rounded" style={{ backgroundColor: colors.surface }} />
          </div>
          <div className="space-y-0.5 mb-3">
            <div className="h-1 w-[85%] rounded" style={{ backgroundColor: colors.surfaceAlt }} />
            <div className="h-1 w-[65%] rounded" style={{ backgroundColor: colors.surfaceAlt }} />
          </div>
          <div className="w-full h-5 rounded-full" style={{ backgroundColor: colors.text }} />
        </div>

        {/* Visual block */}
        <div className="h-16 rounded-lg shrink-0" style={{ backgroundColor: colors.accent }} />

        {/* Home indicator */}
        <div className="mt-2 flex justify-center">
          <div className="w-20 h-1 rounded-full" style={{ backgroundColor: colors.muted }} />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------
// 3D DEVICE COMPONENTS
// ----------------------------------------

function DesktopMonitor({ 
  isDark, 
  position, 
  rotation,
  isLoaded,
}: { 
  isDark: boolean; 
  position: [number, number, number];
  rotation: [number, number, number];
  isLoaded: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  // Idle floating animation + pointer reactivity
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Gentle idle float
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.08;
    groupRef.current.position.x = position[0] + Math.cos(t * 0.3) * 0.04;
    
    // Pointer-reactive rotation (subtle for back element)
    groupRef.current.rotation.y = rotation[1] + pointer.x * 0.08;
    groupRef.current.rotation.x = rotation[0] + pointer.y * 0.04;
  });

  const frameColor = isDark ? "#0c0d10" : "#f2f3f5";
  const bezelColor = isDark ? "#181920" : "#e8eaec";

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      visible={isLoaded}
    >
      {/* Monitor Frame */}
      <RoundedBox args={[6.4, 4, 0.15]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color={frameColor} metalness={0.3} roughness={0.7} />
      </RoundedBox>
      
      {/* Screen Bezel */}
      <RoundedBox args={[6.1, 3.7, 0.12]} radius={0.06} smoothness={4} position={[0, 0.08, 0.04]}>
        <meshStandardMaterial color={bezelColor} metalness={0.2} roughness={0.8} />
      </RoundedBox>
      
      {/* Screen with HTML content */}
      <Html
        transform
        occlude
        position={[0, 0.08, 0.08]}
        scale={0.32}
        style={{ width: "580px", height: "360px", overflow: "hidden", borderRadius: "8px" }}
      >
        <DesktopScreenContent isDark={isDark} />
      </Html>
      
      {/* Monitor Stand Neck */}
      <RoundedBox args={[0.4, 0.8, 0.2]} radius={0.02} smoothness={2} position={[0, -2.3, 0]}>
        <meshStandardMaterial color={frameColor} metalness={0.4} roughness={0.6} />
      </RoundedBox>
      
      {/* Monitor Stand Base */}
      <RoundedBox args={[2, 0.1, 1]} radius={0.03} smoothness={2} position={[0, -2.65, 0.2]}>
        <meshStandardMaterial color={frameColor} metalness={0.4} roughness={0.6} />
      </RoundedBox>
      
      {/* Subtle glow plane behind monitor */}
      <mesh position={[0, 0, -0.3]} scale={[7, 4.5, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          color={isDark ? "#3040608" : "#8090c0"} 
          transparent 
          opacity={isDark ? 0.08 : 0.04} 
        />
      </mesh>
    </group>
  );
}

function Tablet({ 
  isDark, 
  position, 
  rotation,
  isLoaded,
}: { 
  isDark: boolean; 
  position: [number, number, number];
  rotation: [number, number, number];
  isLoaded: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // More pronounced idle float (mid-depth)
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + 1) * 0.1;
    groupRef.current.position.x = position[0] + Math.cos(t * 0.4 + 0.5) * 0.06;
    
    // More pointer reactivity than desktop
    groupRef.current.rotation.y = rotation[1] + pointer.x * 0.12;
    groupRef.current.rotation.x = rotation[0] + pointer.y * 0.06;
  });

  const frameColor = isDark ? "#101114" : "#f2f3f5";

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      visible={isLoaded}
    >
      {/* Tablet Frame */}
      <RoundedBox args={[2.2, 3.1, 0.08]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color={frameColor} metalness={0.35} roughness={0.65} />
      </RoundedBox>
      
      {/* Screen with HTML content */}
      <Html
        transform
        occlude
        position={[0, 0, 0.045]}
        scale={0.22}
        style={{ width: "180px", height: "260px", overflow: "hidden", borderRadius: "16px" }}
      >
        <TabletScreenContent isDark={isDark} />
      </Html>
      
      {/* Frame highlight */}
      <mesh position={[0, 0, 0.045]} scale={[2.15, 3.05, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={isDark ? 0.03 : 0.08}
        />
      </mesh>
    </group>
  );
}

function Mobile({ 
  isDark, 
  position, 
  rotation,
  isLoaded,
}: { 
  isDark: boolean; 
  position: [number, number, number];
  rotation: [number, number, number];
  isLoaded: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Most pronounced idle float (foreground)
    groupRef.current.position.y = position[1] + Math.sin(t * 0.7 + 2) * 0.12;
    groupRef.current.position.x = position[0] + Math.cos(t * 0.45 + 1) * 0.08;
    
    // Most pointer reactivity (foreground moves most)
    groupRef.current.rotation.y = rotation[1] + pointer.x * 0.18;
    groupRef.current.rotation.x = rotation[0] + pointer.y * 0.09;
  });

  const frameColor = isDark ? "#0a0b0e" : "#e8eaec";

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      visible={isLoaded}
    >
      {/* Phone Frame */}
      <RoundedBox args={[1.1, 2.3, 0.08]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color={frameColor} metalness={0.4} roughness={0.6} />
      </RoundedBox>
      
      {/* Screen with HTML content */}
      <Html
        transform
        occlude
        position={[0, 0, 0.045]}
        scale={0.14}
        style={{ width: "120px", height: "260px", overflow: "hidden", borderRadius: "24px" }}
      >
        <MobileScreenContent isDark={isDark} />
      </Html>
      
      {/* Frame highlight */}
      <mesh position={[0, 0, 0.045]} scale={[1.05, 2.25, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={isDark ? 0.04 : 0.1}
        />
      </mesh>
    </group>
  );
}

// ----------------------------------------
// CAMERA RIG - Pointer reactive
// ----------------------------------------

function CameraRig() {
  const { camera, pointer } = useThree();
  
  useFrame(() => {
    // Cinematic camera drift based on pointer
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 + pointer.y * 0.4, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// ----------------------------------------
// ATMOSPHERIC ELEMENTS
// ----------------------------------------

function AtmosphericParticles({ isDark }: { isDark: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = t * 0.02;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color={isDark ? "#4060a0" : "#8090c0"} 
        transparent 
        opacity={isDark ? 0.4 : 0.25}
        sizeAttenuation
      />
    </points>
  );
}

// ----------------------------------------
// MAIN 3D SCENE
// ----------------------------------------

function Scene({ isDark, isLoaded }: { isDark: boolean; isLoaded: boolean }) {
  return (
    <>
      {/* Camera controller */}
      <CameraRig />
      
      {/* Lighting setup */}
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={isDark ? 0.8 : 1.2} 
        castShadow 
      />
      <pointLight 
        position={[-4, 3, 2]} 
        intensity={isDark ? 0.4 : 0.3} 
        color={isDark ? "#6080c0" : "#a0b0d0"} 
      />
      <pointLight 
        position={[6, -2, 4]} 
        intensity={isDark ? 0.3 : 0.2} 
        color={isDark ? "#8060a0" : "#c0a0d0"} 
      />
      
      {/* Environment for reflections */}
      <Environment preset={isDark ? "night" : "city"} />
      
      {/* Atmospheric particles */}
      <AtmosphericParticles isDark={isDark} />
      
      {/* Device lineup: Desktop (back) → Tablet (mid) → Mobile (front) */}
      
      {/* Desktop Monitor - furthest back, largest */}
      <DesktopMonitor
        isDark={isDark}
        position={[2, 0.5, -4]}
        rotation={[0.05, -0.25, 0]}
        isLoaded={isLoaded}
      />
      
      {/* Tablet - middle depth */}
      <Tablet
        isDark={isDark}
        position={[-1.5, -0.3, 0]}
        rotation={[0.03, 0.2, 0]}
        isLoaded={isLoaded}
      />
      
      {/* Mobile - foreground, closest */}
      <Mobile
        isDark={isDark}
        position={[0.8, -0.8, 3]}
        rotation={[0.02, 0.25, 0]}
        isLoaded={isLoaded}
      />
      
      {/* Background depth plane */}
      <mesh position={[0, 0, -10]} scale={[30, 20, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          color={isDark ? "#060710" : "#f0f2f6"} 
        />
      </mesh>
      
      {/* Fog for depth */}
      <fog attach="fog" args={[isDark ? "#080a10" : "#f8fafc", 8, 25]} />
    </>
  );
}

// ----------------------------------------
// HERO COMPONENT
// ----------------------------------------

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Scroll behavior for fullscreen-to-receding effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);

  // Staged load sequence - wait for loader to finish
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Delay 3D scene visibility for staged reveal
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setSceneReady(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Theme-adaptive colors
  const colors = isDark
    ? {
        bg: "#08090c",
        text: "#fafafa",
        textMuted: "#8c8c96",
        border: "#1f2029",
      }
    : {
        bg: "#fafbfc",
        text: "#0c0c0e",
        textMuted: "#6c6c78",
        border: "#e2e4e8",
      };

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", backgroundColor: colors.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, y: yOffset, borderRadius }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ========================================
              LAYER 1: 3D SCENE (React Three Fiber)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Canvas
              camera={{ position: [0, 2, 10], fov: 35 }}
              dpr={[1, 1.5]}
              style={{ background: colors.bg }}
            >
              <Suspense fallback={null}>
                <Scene isDark={isDark} isLoaded={sceneReady} />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* ========================================
              LAYER 2: TYPOGRAPHY & CTA OVERLAY
              ======================================== */}
          <div className="absolute inset-0 flex items-end pb-20 lg:pb-24 pointer-events-none">
            <div className="container-wide w-full">
              <div className="max-w-2xl pointer-events-auto">
                {/* Overline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-8 h-px" style={{ backgroundColor: colors.textMuted }} />
                  <span 
                    className="text-xs font-medium tracking-[0.2em] uppercase"
                    style={{ color: colors.textMuted }}
                  >
                    Digital Product Studio
                  </span>
                </motion.div>

                {/* Main headline */}
                <div className="space-y-1 mb-6">
                  {["Crafting Premium", "Digital Experiences"].map((line, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.h1
                        initial={{ y: "100%" }}
                        animate={isLoaded ? { y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 1.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight"
                        style={{ color: colors.text, lineHeight: 1.05 }}
                      >
                        {line}
                      </motion.h1>
                    </div>
                  ))}
                </div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  className="text-base md:text-lg mb-8 max-w-md"
                  style={{ color: colors.textMuted, lineHeight: 1.6 }}
                >
                  Strategy, design, and development for brands that demand excellence.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.9 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: isDark ? colors.text : '#0c0c0e',
                      color: isDark ? colors.bg : '#fafafa',
                    }}
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:bg-[rgb(var(--surface-1))]"
                    style={{
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    View Work
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, ${colors.bg} 100%)`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
