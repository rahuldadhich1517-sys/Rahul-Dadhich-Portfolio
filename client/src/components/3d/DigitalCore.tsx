import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { getOptimizedConfig } from '../../utils/threeJsConfig';

interface DigitalCoreProps {
  mousePosition?: { x: number; y: number };
  scrollProgress?: number;
  isMobile?: boolean;
}

const DigitalCore: React.FC<DigitalCoreProps> = ({ 
  mousePosition = { x: 0, y: 0 }, 
  scrollProgress = 0,
  isMobile = false 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerIcoRef = useRef<THREE.Mesh>(null);

  // Get device-optimized config
  const optimizedConfig = useMemo(() => getOptimizedConfig(), []);

  // Animation state
  const animationState = useRef({
    mouseX: 0,
    mouseY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
    targetScale: 1,
    glowIntensity: 1,
  });

  // Create particles with optimized count
  const particleGeometry = useMemo(() => {
    const particleCount = optimizedConfig.particleCount;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Distribute particles around the core in a sphere-like pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2.5 + Math.random() * 1.5;

      positions[i] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i + 1] = Math.cos(phi) * radius;
      positions[i + 2] = Math.sin(phi) * Math.sin(theta) * radius;

      velocities[i] = (Math.random() - 0.5) * 0.001;
      velocities[i + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i + 2] = (Math.random() - 0.5) * 0.001;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    return geometry;
  }, [isMobile]);

  // Create particle material
  const particleMaterial = useMemo(() => {
    const material = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: isMobile ? 0.02 : 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      fog: false,
    });
    return material;
  }, [isMobile]);

  // Create custom geometry for core
  const coreGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    // Create a crystalline structure
    const size = 1;
    const points = [
      // Top pyramid
      [0, size, 0],
      [size, 0, size],
      [size, 0, -size],
      [-size, 0, -size],
      [-size, 0, size],
      // Bottom
      [0, -size, 0],
    ];

    points.forEach((p) => {
      vertices.push(...p);
    });

    // Create faces
    const faces = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [5, 2, 1],
      [5, 3, 2],
      [5, 4, 3],
      [5, 1, 4],
    ];

    faces.forEach((face) => {
      indices.push(...face);
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Custom shaders for the core
  const coreShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowIntensity: { value: 1 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform float glowIntensity;

        void main() {
          // Base color with transparency
          vec3 baseColor = vec3(0.0, 1.0, 0.8);
          
          // Fresnel effect for glow
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);
          
          // Glow breathing
          float breathe = sin(time * 0.5) * 0.3 + 0.7;
          
          vec3 finalColor = baseColor * fresnel * glowIntensity * breathe;
          float alpha = 0.8 + fresnel * 0.2;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      wireframe: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Update shader uniforms
  useFrame(({ clock }) => {
    if (coreShaderMaterial.uniforms) {
      coreShaderMaterial.uniforms.time.value = clock.elapsedTime;
      coreShaderMaterial.uniforms.glowIntensity.value = animationState.current.glowIntensity;
    }
  });

  // Main animation loop
  useFrame(() => {
    if (!groupRef.current || !coreRef.current) return;

    const state = animationState.current;

    // Idle rotation
    coreRef.current.rotation.x += 0.0002;
    coreRef.current.rotation.y += 0.0003;

    // Scroll rotation
    coreRef.current.rotation.z = scrollProgress * Math.PI;

    // Mouse parallax with smooth interpolation
    state.targetRotationX = mousePosition.y * 0.3;
    state.targetRotationY = mousePosition.x * 0.3;

    state.mouseX += (state.targetRotationX - state.mouseX) * 0.05;
    state.mouseY += (state.targetRotationY - state.mouseY) * 0.05;

    groupRef.current.rotation.x = state.mouseX;
    groupRef.current.rotation.y = state.mouseY;

    // Scroll scale
    state.targetScale = 1 - scrollProgress * 0.2;
    groupRef.current.scale.x += (state.targetScale - groupRef.current.scale.x) * 0.1;
    groupRef.current.scale.y += (state.targetScale - groupRef.current.scale.y) * 0.1;
    groupRef.current.scale.z += (state.targetScale - groupRef.current.scale.z) * 0.1;

    // Floating animation
    const time = Date.now() * 0.0003;
    groupRef.current.position.y = Math.sin(time) * 0.1;

    // Update particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Wrap around
        if (Math.abs(positions[i]) > 4) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 4) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 4) velocities[i + 2] *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Glow breathing effect
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(animationState.current, {
      glowIntensity: 1.5,
      duration: 2,
      ease: 'sine.inOut',
    });
    timeline.to(animationState.current, {
      glowIntensity: 1,
      duration: 2,
      ease: 'sine.inOut',
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <group ref={groupRef}>
      {/* Core rotating group */}
      <group ref={coreRef}>
        {/* Main crystalline core */}
        <mesh geometry={coreGeometry} material={coreShaderMaterial} scale={isMobile ? 0.8 : 1} />

        {/* Outer glow sphere */}
        <Sphere args={[1.3, 16, 16]} ref={outerIcoRef} scale={isMobile ? 0.8 : 1}>
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.2}
          />
        </Sphere>

        {/* Inner glow sphere */}
        <Sphere args={[0.6, 16, 16]} ref={innerSphereRef} scale={isMobile ? 0.8 : 1}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </group>

      {/* Tech labels around core */}
      <group position={[0, 0, 0]}>
        <Tech label="React" position={[2, 1.5, 0]} />
        <Tech label="Node.js" position={[-2, 1.5, 0]} />
        <Tech label="AI" position={[1.5, -2, 0]} />
        <Tech label="API" position={[-1.5, -2, 0]} />
        <Tech label="DB" position={[0, 2.2, -0.5]} />
        <Tech label="Cloud" position={[0, -2.5, 0.5]} />
      </group>

      {/* Particles */}
      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
    </group>
  );
};

// Tech label component
const Tech: React.FC<{ label: string; position: [number, number, number] }> = ({
  label,
  position,
}) => {
  return (
    <group position={position}>
      <Text
        fontSize={0.3}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        strokeWidth={0.002}
        strokeColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
};

export default DigitalCore;
