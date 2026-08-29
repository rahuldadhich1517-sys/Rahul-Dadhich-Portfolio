import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ContributionDay } from '../../types/github';

interface ContributionLandscape3DProps {
  contributionData: ContributionDay[];
  isMobile?: boolean;
}

const LandscapeContent: React.FC<ContributionLandscape3DProps> = ({
  contributionData,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.InstancedMesh>(null);

  const maxContributions = Math.max(...contributionData.map((d) => d.count), 1);
  const barsPerRow = 7; // 7 days a week
  const barSpacing = 1.2;
  const maxRows = Math.ceil(contributionData.length / barsPerRow);

  useEffect(() => {
    if (!barsRef.current) return;

    // Update bar heights and colors based on contributions
    const dummy = new THREE.Object3D();

    contributionData.forEach((day, index) => {
      const row = Math.floor(index / barsPerRow);
      const col = index % barsPerRow;

      const x = col * barSpacing - (barsPerRow * barSpacing) / 2;
      const z = -row * barSpacing + (maxRows * barSpacing) / 2;
      const height = Math.max(0.1, (day.count / maxContributions) * 3);

      dummy.position.set(x, height / 2, z);
      dummy.scale.set(0.8, height, 0.8);
      dummy.updateMatrix();

      barsRef.current?.setMatrixAt(index, dummy.matrix);
    });

    barsRef.current.instanceMatrix.needsUpdate = true;
  }, [contributionData, maxRows, barsPerRow]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Gentle rotation
    groupRef.current.rotation.y += 0.0002;

    // Subtle bobbing
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Contribution bars */}
      <instancedMesh
        ref={barsRef}
        args={[new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial(), contributionData.length]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          emissive="#00ff88"
          emissiveIntensity={0.5}
          color="#00ff88"
          metalness={0.3}
          roughness={0.7}
        />
      </instancedMesh>

      {/* Grid reference lines */}
      {Array.from({ length: barsPerRow }).map((_, i) => (
        <line key={`col-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                i * barSpacing - (barsPerRow * barSpacing) / 2,
                -0.5,
                (maxRows * barSpacing) / 2,
                i * barSpacing - (barsPerRow * barSpacing) / 2,
                -0.5,
                -(maxRows * barSpacing) / 2,
              ])}
              itemSize={3}
              args={[new Float32Array([
                i * barSpacing - (barsPerRow * barSpacing) / 2,
                -0.5,
                (maxRows * barSpacing) / 2,
                i * barSpacing - (barsPerRow * barSpacing) / 2,
                -0.5,
                -(maxRows * barSpacing) / 2,
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00ff88" transparent opacity={0.2} />
        </line>
      ))}

      {/* Particles for atmosphere */}
      <Points
        positions={generateParticles(barsPerRow, maxRows, barSpacing)}
      >
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.05}
          sizeAttenuation
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

function generateParticles(
  cols: number,
  rows: number,
  spacing: number
): Float32Array {
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * cols * spacing;
    positions[i * 3 + 1] = Math.random() * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * rows * spacing;
  }

  return positions;
}

export const ContributionLandscape3D: React.FC<ContributionLandscape3DProps> = ({
  contributionData,
  isMobile = false,
}) => {
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
    // Static fallback
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-2">3D contribution visualization</p>
          <p className="text-sm text-gray-500">
            {contributionData.reduce((sum, d) => sum + d.count, 0)} total contributions
          </p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      className="w-full h-full"
      dpr={isMobile ? 1 : window.devicePixelRatio}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ff88" />
      <pointLight position={[-5, 3, -5]} intensity={0.4} color="#00ffff" />

      <LandscapeContent contributionData={contributionData} isMobile={isMobile} />
    </Canvas>
  );
};
