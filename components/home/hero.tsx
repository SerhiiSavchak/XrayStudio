"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

// ===========================================
// IMMERSIVE 3D DIGITAL SCENE HERO
// Real WebGL depth with camera-reactive movement
// ===========================================

// Camera rig that responds to mouse movement
function CameraRig() {
  const { camera, pointer } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Subtle camera movement based on pointer
    targetPosition.current.x = pointer.x * 1.5;
    targetPosition.current.y = pointer.y * 0.8;
    targetPosition.current.z = 10;

    // Smooth interpolation
    camera.position.lerp(targetPosition.current, delta * 2);
    
    // Subtle look-at drift
    targetLookAt.current.x = pointer.x * 0.3;
    targetLookAt.current.y = pointer.y * 0.2;
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

// Atmospheric fog and ambient particles
function Atmosphere() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    sizes[i] = Math.random() * 0.03 + 0.01;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4a5580"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Large background screen surface - deepest layer
function BackgroundScreen() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -12]}>
      <planeGeometry args={[24, 14]} />
      <meshStandardMaterial
        color="#0a0c14"
        emissive="#1a1e2e"
        emissiveIntensity={0.3}
        transparent
        opacity={0.95}
      />
      {/* Screen glow effect */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[22, 12]} />
        <meshBasicMaterial
          color="#15192a"
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Interface lines on screen */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-9 + i * 2.5, 4, 0.02]}>
          <planeGeometry args={[1.8, 0.08]} />
          <meshBasicMaterial color="#252a3d" transparent opacity={0.6} />
        </mesh>
      ))}
    </mesh>
  );
}

// Secondary screen - mid-back layer
function SecondaryScreen() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -0.15 + Math.sin(state.clock.elapsedTime * 0.12) * 0.03;
      meshRef.current.position.x = -6 + Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[-6, 1, -8]} rotation={[0, 0.2, 0]}>
      <planeGeometry args={[8, 10]} />
      <meshStandardMaterial
        color="#0c0f18"
        emissive="#1e2436"
        emissiveIntensity={0.25}
        transparent
        opacity={0.9}
      />
      {/* Code-like content lines */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[-2.5 + (i % 3) * 1.2, 3.5 - Math.floor(i / 3) * 0.8, 0.01]}>
          <planeGeometry args={[0.8 + Math.random() * 1.2, 0.06]} />
          <meshBasicMaterial 
            color={i % 4 === 0 ? "#3b5998" : "#2a2e3d"} 
            transparent 
            opacity={0.5} 
          />
        </mesh>
      ))}
    </mesh>
  );
}

// Primary browser window - central dominant element
function PrimaryBrowser() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.08 + Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.015;
      groupRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[3, 0.5, -3]} rotation={[0, -0.1, 0]}>
        {/* Browser frame */}
        <mesh>
          <planeGeometry args={[9, 6]} />
          <meshStandardMaterial
            color="#0d1017"
            emissive="#1a2030"
            emissiveIntensity={0.4}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        
        {/* Browser top bar */}
        <mesh position={[0, 2.7, 0.01]}>
          <planeGeometry args={[9, 0.5]} />
          <meshBasicMaterial color="#15191f" />
        </mesh>
        
        {/* Browser dots */}
        {[-3.8, -3.5, -3.2].map((x, i) => (
          <mesh key={i} position={[x, 2.7, 0.02]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color={["#ff5f56", "#ffbd2e", "#27ca40"][i]} />
          </mesh>
        ))}
        
        {/* URL bar */}
        <mesh position={[0.5, 2.7, 0.02]}>
          <planeGeometry args={[5, 0.25]} />
          <meshBasicMaterial color="#1a1e28" />
        </mesh>
        
        {/* Content area - website mockup */}
        <mesh position={[0, -0.15, 0.02]}>
          <planeGeometry args={[8.5, 5]} />
          <meshBasicMaterial color="#0a0d12" />
        </mesh>
        
        {/* Hero section mockup */}
        <mesh position={[0, 1.2, 0.03]}>
          <planeGeometry args={[8, 2]} />
          <meshStandardMaterial 
            color="#12161f" 
            emissive="#2a3550"
            emissiveIntensity={0.15}
          />
        </mesh>
        
        {/* Navigation items */}
        {[-2.5, -1, 0.5, 2].map((x, i) => (
          <mesh key={i} position={[x, 2.1, 0.03]}>
            <planeGeometry args={[0.8, 0.08]} />
            <meshBasicMaterial color="#3a4055" transparent opacity={0.6} />
          </mesh>
        ))}
        
        {/* Content blocks */}
        <mesh position={[-2, 0, 0.03]}>
          <planeGeometry args={[3.5, 0.12]} />
          <meshBasicMaterial color="#4a5580" transparent opacity={0.5} />
        </mesh>
        <mesh position={[-2.5, -0.4, 0.03]}>
          <planeGeometry args={[2.5, 0.08]} />
          <meshBasicMaterial color="#353a4d" transparent opacity={0.4} />
        </mesh>
        
        {/* Image placeholder */}
        <mesh position={[2, -0.5, 0.03]}>
          <planeGeometry args={[3, 2.5]} />
          <meshStandardMaterial 
            color="#1a1e2a" 
            emissive="#252a3d"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Cards row */}
        {[-2.5, -0.5, 1.5].map((x, i) => (
          <mesh key={i} position={[x, -1.8, 0.03]}>
            <planeGeometry args={[2.2, 1.2]} />
            <meshBasicMaterial color="#14171f" />
          </mesh>
        ))}
        
        {/* Subtle screen glow */}
        <pointLight position={[0, 0, 2]} intensity={0.3} color="#4a6090" distance={8} />
      </group>
    </Float>
  );
}

// Floating UI panel - near layer
function FloatingPanel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -0.25 + Math.sin(state.clock.elapsedTime * 0.18) * 0.04;
      meshRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[-4, -1, 0]} rotation={[0, 0.3, 0.05]}>
      <planeGeometry args={[4, 5]} />
      <meshStandardMaterial
        color="#0b0e15"
        emissive="#1e2538"
        emissiveIntensity={0.3}
        transparent
        opacity={0.95}
      />
      {/* Panel header */}
      <mesh position={[0, 2, 0.01]}>
        <planeGeometry args={[3.5, 0.4]} />
        <meshBasicMaterial color="#1a1e28" />
      </mesh>
      {/* List items */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, 1.2 - i * 0.6, 0.01]}>
          <planeGeometry args={[3.2, 0.35]} />
          <meshBasicMaterial 
            color={i === 1 ? "#1e2a3d" : "#12151c"} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      ))}
    </mesh>
  );
}

// Foreground glass layer - creates depth
function ForegroundGlass() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = 6 + Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      meshRef.current.rotation.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[6, 2, 4]} rotation={[0.1, -0.4, 0.1]}>
      <planeGeometry args={[6, 8]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.02}
        transmission={0.95}
        roughness={0.1}
        color="#1a2030"
      />
    </mesh>
  );
}

// Bottom foreground glass strip
function BottomGlassStrip() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -4 + Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -4, 6]} rotation={[0.5, 0, 0]}>
      <planeGeometry args={[20, 3]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.3}
        chromaticAberration={0.01}
        transmission={0.9}
        roughness={0.15}
        color="#151a25"
      />
    </mesh>
  );
}

// Small floating accent screens
function AccentScreens() {
  return (
    <>
      {/* Top right small screen */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh position={[7, 3, -5]} rotation={[0.1, -0.3, 0.05]}>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial
            color="#0d1018"
            emissive="#252d45"
            emissiveIntensity={0.35}
            transparent
            opacity={0.9}
          />
          {/* Mini content */}
          <mesh position={[0, 0.5, 0.01]}>
            <planeGeometry args={[2.2, 0.15]} />
            <meshBasicMaterial color="#3a4560" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.3, 0, 0.01]}>
            <planeGeometry args={[1.5, 0.1]} />
            <meshBasicMaterial color="#2a3040" transparent opacity={0.4} />
          </mesh>
        </mesh>
      </Float>
      
      {/* Bottom left small panel */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh position={[-7, -2.5, -2]} rotation={[0, 0.35, -0.05]}>
          <planeGeometry args={[2.5, 3]} />
          <meshStandardMaterial
            color="#0c0f17"
            emissive="#1e2435"
            emissiveIntensity={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </>
  );
}

// Light rays / volumetric streaks
function LightStreaks() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          position={[-10 + i * 5, 8, 0]} 
          rotation={[0, 0, -0.4 + i * 0.1]}
        >
          <planeGeometry args={[0.5, 25]} />
          <meshBasicMaterial
            color="#2a3550"
            transparent
            opacity={0.03 + i * 0.01}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Environment */}
      <color attach="background" args={["#050508"]} />
      <fog attach="fog" args={["#050508", 8, 35]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#6080c0" />
      <directionalLight position={[-5, -5, 5]} intensity={0.15} color="#4060a0" />
      <pointLight position={[0, 0, 5]} intensity={0.4} color="#5070a0" distance={15} />
      
      {/* Camera control */}
      <CameraRig />
      
      {/* Scene layers - back to front */}
      <LightStreaks />
      <Atmosphere />
      <BackgroundScreen />
      <SecondaryScreen />
      <AccentScreens />
      <PrimaryBrowser />
      <FloatingPanel />
      <ForegroundGlass />
      <BottomGlassStrip />
    </>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms - hero recedes on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 28]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-3%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.5]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050508]"
      style={{ height: "200vh" }}
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
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(5,5,8,0.7) 100%)
              `,
            }}
          />

          {/* Bottom gradient for text readability */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(5,5,8,0.9), transparent)",
            }}
          />

          {/* Text overlay - minimal, embedded in scene */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 flex items-end pb-16 lg:pb-24 xl:pb-28 pointer-events-none"
          >
            <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pointer-events-auto">
              <div className="max-w-3xl">
                {/* Headline */}
                <div className="overflow-hidden mb-4 lg:mb-6">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.5rem,7vw,6rem)] font-light tracking-tight leading-[0.95] text-white"
                  >
                    We craft digital
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.5rem,7vw,6rem)] font-light tracking-tight leading-[0.95] text-white"
                  >
                    <span className="text-white/40">experiences that</span>{" "}
                    <span className="italic font-normal">perform</span>
                  </motion.h1>
                </div>

                {/* Supporting text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base lg:text-lg text-white/50 max-w-lg mb-8 lg:mb-10 leading-relaxed"
                >
                  Strategic design & development studio creating premium digital products for ambitious brands.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#0a0b10] rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-300"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300"
                  >
                    <span>View Our Work</span>
                  </Link>
                </motion.div>

                {/* Trust row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1.3 }}
                  className="flex items-center gap-6 mt-12 lg:mt-16"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#0a0b10]"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/40 tracking-wide">50+ Clients</span>
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="text-xs text-white/40 tracking-wide">Est. 2019</span>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="text-xs text-white/40 tracking-wide">Based in Ukraine</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Corner frame accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="absolute top-6 left-6 w-12 h-12 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-6 h-px bg-white/15" />
            <div className="absolute top-0 left-0 w-px h-6 bg-white/15" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="absolute top-6 right-6 w-12 h-12 pointer-events-none"
          >
            <div className="absolute top-0 right-0 w-6 h-px bg-white/15" />
            <div className="absolute top-0 right-0 w-px h-6 bg-white/15" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.7 }}
            className="absolute bottom-6 left-6 w-12 h-12 pointer-events-none"
          >
            <div className="absolute bottom-0 left-0 w-6 h-px bg-white/15" />
            <div className="absolute bottom-0 left-0 w-px h-6 bg-white/15" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="absolute bottom-6 right-6 w-12 h-12 pointer-events-none"
          >
            <div className="absolute bottom-0 right-0 w-6 h-px bg-white/15" />
            <div className="absolute bottom-0 right-0 w-px h-6 bg-white/15" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
