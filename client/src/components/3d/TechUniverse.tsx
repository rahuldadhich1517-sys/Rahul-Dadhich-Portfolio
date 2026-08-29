import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Skill } from '../../data/skills';
import TechNode from './TechNode';

interface TechUniverseProps {
  skills: Skill[];
}

const TechUniverse: React.FC<TechUniverseProps> = ({ skills }) => {
  const groupRef = useRef<THREE.Group>(null);
  const centerRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Generate constellation positions
  const positions = useRef<{ [key: string]: THREE.Vector3 }>({});
  const velocities = useRef<{ [key: string]: THREE.Vector3 }>({});

  useEffect(() => {
    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const radius = 4;
      const y = (Math.random() - 0.5) * 3;

      positions.current[skill.id] = new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );

      velocities.current[skill.id] = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.02
      );
    });
  }, [skills]);

  // Animation loop
  useFrame(() => {
    if (!groupRef.current) return;

    // Slow rotation
    groupRef.current.rotation.y += 0.0002;

    // Update node positions with floating animation
    Object.keys(positions.current).forEach((skillId) => {
      const pos = positions.current[skillId];
      const vel = velocities.current[skillId];

      // Add floating motion
      pos.x += vel.x;
      pos.y += vel.y;
      pos.z += vel.z;

      // Bounce at bounds
      if (Math.abs(pos.x) > 5) vel.x *= -1;
      if (Math.abs(pos.y) > 3) vel.y *= -1;
      if (Math.abs(pos.z) > 5) vel.z *= -1;
    });

    // Gentle bobbing animation
    if (centerRef.current) {
      centerRef.current.position.y = Math.sin(Date.now() * 0.0003) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center text */}
      <group ref={centerRef}>
        <Text
          fontSize={1.2}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          strokeWidth={0.001}
          strokeColor="#000000"
        >
          RAHUL
        </Text>
      </group>

      {/* Tech nodes */}
      {skills.map((skill) => {
        const pos = positions.current[skill.id];
        if (!pos) return null;

        return (
          <TechNode
            key={skill.id}
            skill={skill}
            position={[pos.x, pos.y, pos.z]}
            isHovered={hoveredNode === skill.id}
            onHover={() => setHoveredNode(skill.id)}
            onUnhover={() => setHoveredNode(null)}
          />
        );
      })}

      {/* Subtle connecting lines */}
      <group>
        {skills.slice(0, Math.min(skills.length, 10)).map((skill1, i) => {
          return skills.slice(i + 1, Math.min(i + 3, skills.length)).map((skill2) => {
            const pos1 = positions.current[skill1.id];
            const pos2 = positions.current[skill2.id];

            if (!pos1 || !pos2) return null;

            return (
              <Line
                key={`${skill1.id}-${skill2.id}`}
                points={[[pos1.x, pos1.y, pos1.z], [pos2.x, pos2.y, pos2.z]]}
                color="#00ff88"
                lineWidth={0.5}
                transparent
                opacity={0.1}
              />
            );
          });
        })}
      </group>
    </group>
  );
};

export default TechUniverse;
