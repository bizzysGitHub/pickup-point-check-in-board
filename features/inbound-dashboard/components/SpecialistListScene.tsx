"use client";

import { Canvas, useThree } from "@react-three/fiber";

interface SpecialistListSceneProps {
  accents: string[];
  activeIndex: number | null;
}

function SpecialistPlates({ accents, activeIndex }: SpecialistListSceneProps) {
  const { viewport } = useThree();
  const rowHeight = viewport.height / Math.max(accents.length, 1);

  return (
    <group>
      {accents.map((accent, index) => {
        const active = activeIndex === index;
        const y = viewport.height / 2 - rowHeight * (index + 0.5);

        return (
          <mesh
            key={`${accent}-${index}`}
            position={[0, y, active ? 0.2 : 0]}
            rotation={[active ? -0.035 : -0.012, active ? 0.018 : 0, 0]}
            scale={[viewport.width * 0.94, rowHeight * 0.8, 1]}
          >
            <boxGeometry args={[1, 1, 0.12]} />
            <meshPhysicalMaterial
              color={active ? "#0a365f" : "#062746"}
              emissive={accent}
              emissiveIntensity={active ? 0.14 : 0.035}
              metalness={0.38}
              roughness={0.32}
              clearcoat={0.92}
              clearcoatRoughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function SpecialistListScene({
  accents,
  activeIndex,
}: SpecialistListSceneProps) {
  return (
    <div className="specialist-list-scene" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 6], zoom: 72 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight
          color="#8ad9ff"
          intensity={2.8}
          position={[-3, 5, 6]}
        />
        <pointLight color="#42bdff" intensity={5} position={[3, -2, 4]} />
        <SpecialistPlates accents={accents} activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}
