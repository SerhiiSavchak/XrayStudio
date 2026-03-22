"use client";

import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

// ===========================================
// CINEMATIC HERO - PREMIUM DIGITAL STAGE
// Strong focal point, clear depth layers, 
// dramatic lighting, responsive camera
// ===========================================

// Enhanced camera rig with stronger movement
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0, z: 12 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Stronger camera orbit effect
    targetRef.current.x = mouseRef.current.x * 3;
    targetRef.current.y = mouseRef.current.y * 2 + 0.5;
    
    // Smooth interpolation with good damping
    camera.position.x += (targetRef.current.x - camera.position.x) * delta * 1.5;
    camera.position.y += (targetRef.current.y - camera.position.y) * delta * 1.5;
    camera.position.z = 12;
    
    // Look at center with slight offset based on mouse
    camera.lookAt(
      mouseRef.current.x * 0.5,
      mouseRef.current.y * 0.3,
      0
    );
  });

  return null;
}

// Background ambient layer - deep space with subtle glow
function BackgroundLayer() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
  });

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      
      void main() {
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        
        // Deep radial gradient
        vec3 deep = vec3(0.02, 0.02, 0.04);
        vec3 mid = vec3(0.05, 0.06, 0.1);
        vec3 glow = vec3(0.08, 0.1, 0.18);
        
        // Breathing glow
        float pulse = sin(uTime * 0.3) * 0.5 + 0.5;
        float glowIntensity = smoothstep(0.8, 0.0, dist) * (0.3 + pulse * 0.2);
        
        vec3 color = mix(glow, mid, smoothstep(0.0, 0.5, dist));
        color = mix(color, deep, smoothstep(0.5, 1.0, dist));
        color += glowIntensity * vec3(0.1, 0.12, 0.2);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), []);

  return (
    <mesh ref={meshRef} position={[0, 0, -25]}>
      <planeGeometry args={[60, 40]} />
      <shaderMaterial attach="material" {...shader} />
    </mesh>
  );
}

// Dramatic spotlight system
function Lighting() {
  return (
    <>
      {/* Main key light - dramatic top-right */}
      <spotLight
        position={[8, 8, 8]}
        angle={0.4}
        penumbra={0.8}
        intensity={2}
        color="#a0b0e0"
        castShadow
      />
      
      {/* Fill light - softer from left */}
      <spotLight
        position={[-6, 4, 6]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#6080b0"
      />
      
      {/* Rim light - from behind for edge definition */}
      <spotLight
        position={[0, 2, -10]}
        angle={0.6}
        penumbra={0.5}
        intensity={1.5}
        color="#4060a0"
      />
      
      {/* Ambient base */}
      <ambientLight intensity={0.15} color="#8090b0" />
      
      {/* Point light on primary element */}
      <pointLight position={[2, 0, 2]} intensity={1} color="#8090c0" distance={10} />
    </>
  );
}

// PRIMARY FOCAL ELEMENT - Large dominant browser/interface
function PrimaryInterface() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.y = 0.12 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, -2]}>
      {/* Main browser frame - the dominant element */}
      <RoundedBox args={[11, 7, 0.15]} radius={0.15} smoothness={4}>
        <meshStandardMaterial
          color="#0a0c12"
          metalness={0.3}
          roughness={0.7}
          envMapIntensity={0.5}
        />
      </RoundedBox>
      
      {/* Screen glow behind */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial color="#1a2540" transparent opacity={0.5} />
      </mesh>
      
      {/* Browser header */}
      <mesh position={[0, 3.1, 0.08]}>
        <planeGeometry args={[10.6, 0.6]} />
        <meshStandardMaterial color="#12151c" metalness={0.1} roughness={0.9} />
      </mesh>
      
      {/* Traffic lights */}
      {[
        { x: -4.8, color: "#ff5f57" },
        { x: -4.4, color: "#febc2e" },
        { x: -4.0, color: "#28c840" },
      ].map((dot, i) => (
        <mesh key={i} position={[dot.x, 3.1, 0.1]}>
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color={dot.color} />
        </mesh>
      ))}
      
      {/* URL bar */}
      <RoundedBox args={[5, 0.35, 0.02]} radius={0.1} position={[0, 3.1, 0.1]}>
        <meshStandardMaterial color="#1a1e28" />
      </RoundedBox>
      
      {/* Content area - clean interface mockup */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[10.6, 5.8]} />
        <meshStandardMaterial color="#080a0f" metalness={0.1} roughness={0.95} />
      </mesh>
      
      {/* Hero section highlight */}
      <mesh position={[0, 1.2, 0.1]}>
        <planeGeometry args={[10, 2.5]} />
        <meshStandardMaterial 
          color="#101420" 
          emissive="#1a2540"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Large headline text placeholder */}
      <mesh position={[-2, 1.5, 0.12]}>
        <planeGeometry args={[5, 0.4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-3, 0.9, 0.12]}>
        <planeGeometry args={[3, 0.25]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
      
      {/* CTA button */}
      <RoundedBox args={[1.8, 0.5, 0.02]} radius={0.15} position={[-3.5, 0.2, 0.12]}>
        <meshBasicMaterial color="#ffffff" />
      </RoundedBox>
      
      {/* Right side visual */}
      <mesh position={[3, 0.5, 0.12]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial 
          color="#1a2030" 
          emissive="#252d45"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Bottom cards */}
      {[-3, 0, 3].map((x, i) => (
        <RoundedBox key={i} args={[2.8, 1.5, 0.03]} radius={0.1} position={[x, -1.8, 0.1]}>
          <meshStandardMaterial 
            color="#0c0f15" 
            emissive={i === 1 ? "#1a2540" : "#0f1218"}
            emissiveIntensity={0.2}
          />
        </RoundedBox>
      ))}
      
      {/* Screen reflection sweep */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[10.6, 5.8]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.02}
        />
      </mesh>
    </group>
  );
}

// Secondary panel - left side, supporting depth
function SecondaryPanel() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.35) * 0.2;
      meshRef.current.rotation.y = 0.25 + Math.sin(state.clock.elapsedTime * 0.25) * 0.03;
    }
  });

  return (
    <group ref={meshRef} position={[-6, -0.5, -6]} rotation={[0, 0.25, 0.02]}>
      <RoundedBox args={[5, 7, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#0c0e14"
          metalness={0.2}
          roughness={0.8}
          emissive="#151a28"
          emissiveIntensity={0.15}
        />
      </RoundedBox>
      
      {/* Panel content - code-like lines */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[-1.5 + (i % 2) * 0.5, 2.5 - i * 0.5, 0.06]}>
          <planeGeometry args={[1.5 + Math.random() * 1.5, 0.08]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#4a5580" : "#2a2e3d"} 
            transparent 
            opacity={0.6 - i * 0.04} 
          />
        </mesh>
      ))}
    </group>
  );
}

// Deep background screen - furthest layer
function BackgroundScreen() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[5, 1, -12]} rotation={[0, -0.2, 0]}>
      <planeGeometry args={[14, 9]} />
      <meshStandardMaterial
        color="#080a10"
        emissive="#101828"
        emissiveIntensity={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Foreground glass accent - right side
function ForegroundGlass() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = 7 + Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
      meshRef.current.rotation.y = -0.35 + Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[7, 1, 4]} rotation={[0.05, -0.35, 0.05]}>
      <planeGeometry args={[4, 8]} />
      <meshStandardMaterial
        color="#1a2030"
        transparent
        opacity={0.15}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Bottom foreground element
function BottomForeground() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -4.5 + Math.sin(state.clock.elapsedTime * 0.18) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, -4.5, 6]} rotation={[0.6, 0.1, 0]}>
      <planeGeometry args={[12, 2.5]} />
      <meshStandardMaterial
        color="#151a25"
        transparent
        opacity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Floating small accent element
function FloatingAccent() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[8, 3, -4]} rotation={[0.1, -0.2, 0.05]}>
        <RoundedBox args={[2.5, 1.8, 0.08]} radius={0.08}>
          <meshStandardMaterial
            color="#0d1018"
            emissive="#1e2840"
            emissiveIntensity={0.3}
          />
        </RoundedBox>
        <mesh position={[0, 0.4, 0.05]}>
          <planeGeometry args={[1.8, 0.15]} />
          <meshBasicMaterial color="#4a5580" transparent opacity={0.5} />
        </mesh>
        <mesh position={[-0.2, 0, 0.05]}>
          <planeGeometry args={[1.2, 0.1]} />
          <meshBasicMaterial color="#3a4060" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// Subtle particle field - restrained, not dominant
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#5060a0"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Background */}
      <color attach="background" args={["#030406"]} />
      <fog attach="fog" args={["#030406", 15, 40]} />
      
      {/* Lighting system */}
      <Lighting />
      
      {/* Camera control */}
      <CameraRig />
      
      {/* Scene layers - back to front */}
      <BackgroundLayer />
      <ParticleField />
      <BackgroundScreen />
      <SecondaryPanel />
      <FloatingAccent />
      <PrimaryInterface />
      <ForegroundGlass />
      <BottomForeground />
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
      className="relative bg-[#030406]"
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
              camera={{ position: [0, 0.5, 12], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(3,4,6,0.6) 80%, rgba(3,4,6,0.95) 100%)
              `,
            }}
          />

          {/* Bottom gradient for text area */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(3,4,6,0.95) 0%, rgba(3,4,6,0.7) 40%, transparent 100%)",
            }}
          />
          
          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
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
                {/* Headline - restored font-display (Syne) */}
                <div className="overflow-hidden mb-3 lg:mb-5">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-semibold tracking-tight leading-[0.95] text-white"
                  >
                    We craft digital
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-semibold tracking-tight leading-[0.95] text-white"
                  >
                    <span className="text-white/40">experiences that</span>{" "}
                    <span className="italic font-medium">perform</span>
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
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-xs text-white/40 tracking-wide">EST. 2020</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
