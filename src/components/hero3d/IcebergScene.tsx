"use client";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Escena deliberadamente mínima: solo el iceberg sobre un degradado.
// Las capas anteriores (cielo, plano de agua, rayos, resplandor) competían
// entre sí y cada una dejaba una costura visible.

const BERG_SCALE = 7.5;

// Degradado de fondo dibujado por código: cero peso, sin imágenes que casen mal.
function useGradientTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 4;
    c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0.0, "#0b1033"); // cielo profundo
    g.addColorStop(0.35, "#17315e");
    g.addColorStop(0.52, "#1d5f78"); // donde el ojo lee la superficie
    g.addColorStop(0.72, "#0a3b46");
    g.addColorStop(1.0, "#04131d"); // profundidad
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Background() {
  const tex = useGradientTexture();
  const { scene } = useThree();
  useMemo(() => {
    scene.background = tex;
  }, [scene, tex]);
  return null;
}

function Iceberg({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { scene: model } = useGLTF("/models/iceberg.glb");

  // Material de hielo propio: el del modelo viene de una foto y se ve opaco.
  const berg = useMemo(() => {
    const clone = model.clone(true);
    clone.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#bfe4ff"),
        roughness: 0.2,
        metalness: 0,
        transmission: 0.5,
        thickness: 4,
        ior: 1.31,
        clearcoat: 1,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.4,
      });
    });
    return clone;
  }, [model]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Giro lento y reacción al mouse: lo que un video no puede hacer
    group.current.rotation.y = t * 0.05 + state.pointer.x * 0.22;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.05,
      0.05
    );
    group.current.position.y = -3.6 + Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={group} position={[0, -3.6, 0]} scale={BERG_SCALE}>
      <primitive object={berg} />
    </group>
  );
}

useGLTF.preload("/models/iceberg.glb");

// La cámara baja a lo largo del scroll: de la punta a la masa sumergida.
function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress.current;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.6 - p * 6.5, 0.07);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 13 - p * 3.5, 0.07);
    camera.lookAt(0, THREE.MathUtils.lerp(1.2, -3.4, p), 0);
  });
  return null;
}

export default function IcebergScene({
  progress,
}: {
  progress: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 2.6, 13], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Background />

      {/* Entorno que el hielo refracta: aurora violeta arriba, turquesa abajo */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3.2} color="#a78bfa" scale={[24, 12, 1]} position={[0, 11, -10]} />
        <Lightformer form="rect" intensity={2.6} color="#5dcaa5" scale={[18, 10, 1]} position={[-12, 3, -4]} rotation={[0, Math.PI / 3, 0]} />
        <Lightformer form="rect" intensity={2.2} color="#2fd4c0" scale={[22, 14, 1]} position={[0, -10, -4]} />
        <Lightformer form="rect" intensity={1.8} color="#ffffff" scale={[9, 5, 1]} position={[10, 6, 6]} rotation={[0, -Math.PI / 3, 0]} />
      </Environment>

      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 10, 6]} intensity={1.1} color="#dbefff" />
      <pointLight position={[-7, 5, 2]} intensity={60} color="#8b5cf6" distance={28} />
      <pointLight position={[0, -7, 4]} intensity={45} color="#2fd4c0" distance={24} />

      <Suspense fallback={null}>
        <Iceberg progress={progress} />
      </Suspense>

      {/* Partículas sutiles: dan escala y profundidad sin competir */}
      <Sparkles count={50} scale={[18, 16, 10]} position={[0, -1, 0]} size={1.8} speed={0.25} color="#cfeaff" opacity={0.35} />

      <Rig progress={progress} />
    </Canvas>
  );
}
