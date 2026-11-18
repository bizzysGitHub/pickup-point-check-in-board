"use client";

import { Canvas, useThree } from "@react-three/fiber";

interface GuestRowSceneProps {
  accent: string;
  active: boolean;
  surfaceColor?: string;
  activeSurfaceColor?: string;
}

function LitRowPlate({
  accent,
  active,
  surfaceColor = "#061f3d",
  activeSurfaceColor = "#092f58",
}: GuestRowSceneProps) {
  const { viewport } = useThree();

  return (
    <group
      position={[0, active ? 0.03 : 0, active ? 0.18 : 0]}
      rotation={[active ? -0.035 : -0.015, active ? 0.012 : 0, 0]}
    >
      <mesh scale={[viewport.width * 0.98, viewport.height * 0.78, 1]}>
        <boxGeometry args={[1, 1, 0.12]} />
        <meshPhysicalMaterial
          color={active ? activeSurfaceColor : surfaceColor}
          emissive={accent}
          emissiveIntensity={active ? 0.12 : 0.035}
          metalness={0.42}
          roughness={0.34}
          clearcoat={0.9}
          clearcoatRoughness={0.22}
        />
      </mesh>
    </group>
  );
}

export function GuestRowScene({
  accent,
  active,
  surfaceColor,
  activeSurfaceColor,
}: GuestRowSceneProps) {
  return (
    <div className="guest-row-scene" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 6], zoom: 72 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight
          color="#83d7ff"
          intensity={2.7}
          position={[-4, 5, 6]}
        />
        <pointLight color={accent} intensity={6} position={[4, -1, 4]} />
        <LitRowPlate
          accent={accent}
          active={active}
          surfaceColor={surfaceColor}
          activeSurfaceColor={activeSurfaceColor}
        />
      </Canvas>
    </div>
  );
}
