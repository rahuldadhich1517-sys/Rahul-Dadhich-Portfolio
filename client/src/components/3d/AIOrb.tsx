import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { getOptimizedConfig } from '../../utils/threeJsConfig';

interface AIOrb3DProps {
  isMobile?: boolean;
}

const OrbContent: React.FC<AIOrb3DProps> = ({ isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);

  // Get device-optimized particle count
  const optimizedConfig = useMemo(() => getOptimizedConfig(), []);
  const particleCount = optimizedConfig.particleCount;

  useEffect(() => {
    // Create particle positions for energy field
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Create particles in a sphere with some randomness
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 1.5;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [particleCount]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow rotation
    groupRef.current.rotation.x += 0.0003;
    groupRef.current.rotation.y += 0.0004;

    // Subtle bobbing animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

    // Animate particles with energy-like effect
    if (particlesRef.current && particlesRef.current.geometry.attributes.position) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const time = state.clock.elapsedTime;

        // Get original position
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Apply wave-like deformation
        const dist = Math.sqrt(x * x + y * y + z * z);
        const angle = Math.atan2(y, x);

        const wave = Math.sin(time * 2 + dist * 3 + angle) * 0.3;
        const normalizedX = x / dist;
        const normalizedY = y / dist;
        const normalizedZ = z / dist;

        positions[i] = normalizedX * (dist + wave);
        positions[i + 1] = normalizedY * (dist + wave);
        positions[i + 2] = normalizedZ * (dist + wave);
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Pulse inner sphere
    if (innerSphereRef.current && innerSphereRef.current.material instanceof THREE.MeshStandardMaterial) {
      const material = innerSphereRef.current.material;
      const intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      material.emissiveIntensity = intensity;
    }

    // Pulse outer sphere
    if (outerSphereRef.current && outerSphereRef.current.material instanceof THREE.MeshStandardMaterial) {
      const material = outerSphereRef.current.material;
      const intensity = 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      material.emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particle field */}
      <Points ref={particlesRef} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff88"
          size={isMobile ? 0.03 : 0.04}
          sizeAttenuation
          opacity={0.6}
          depthWrite={false}
        />
      </Points>

      {/* Inner glowing sphere */}
      <mesh ref={innerSphereRef} scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          emissive="#00ffff"
          emissiveIntensity={1}
          color="#001a33"
          transparent
          opacity={0.3}
          wireframe={false}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Outer transparent sphere with glow */}
      <mesh ref={outerSphereRef} scale={1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          emissive="#00ff88"
          emissiveIntensity={0.6}
          color="#003311"
          transparent
          opacity={0.15}
          wireframe={false}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Wireframe sphere for visual definition */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          emissive="#00ff88"
          emissiveIntensity={0.3}
          color="transparent"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

export const AIOrb3D: React.FC<AIOrb3DProps> = ({ isMobile = false }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    // Fallback: static sphere representation
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-radial from-[#00ff88]/30 to-transparent rounded-full" />
          <div className="absolute inset-8 border-2 border-[#00ff88]/40 rounded-full" />
          <div className="absolute inset-16 border border-[#00ffff]/20 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      className="w-full h-full"
      dpr={isMobile ? 1 : window.devicePixelRatio}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ff88" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#00ffff" />

      <OrbContent isMobile={isMobile} />

      {/* Performance optimization: no post-processing */}
    </Canvas>
  );
};
