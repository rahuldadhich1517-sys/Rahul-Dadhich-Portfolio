import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { Skill } from '../../data/skills';

interface TechNodeProps {
  skill: Skill;
  position: [number, number, number];
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

const TechNode: React.FC<TechNodeProps> = ({
  skill,
  position,
  isHovered,
  onHover,
  onUnhover,
}) => {
  const nodeRef = useRef<THREE.Group>(null);
  const targetZ = useRef(position[2]);

  // Camera movement on hover
  useFrame(() => {
    if (!nodeRef.current) return;

    if (isHovered) {
      // Move node slightly toward camera
      targetZ.current = position[2] - 1;
      nodeRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else {
      targetZ.current = position[2];
      nodeRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }

    nodeRef.current.position.z += (targetZ.current - nodeRef.current.position.z) * 0.1;
  });

  return (
    <group
      ref={nodeRef}
      position={position}
      onPointerEnter={onHover}
      onPointerLeave={onUnhover}
    >
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1 : 0.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1.2 : 0.8}
        />
      </mesh>

      {/* Icon label */}
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.4}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        {skill.icon}
      </Text>

      {/* Tech name */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.25}
        color={skill.color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {skill.name}
      </Text>
    </group>
  );
};

export default TechNode;
