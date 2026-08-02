import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'
import { useInView } from 'framer-motion'

interface CoreProps {
  scrollProgress: MotionValue<number>
}

function Core({ scrollProgress }: CoreProps) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const p = scrollProgress.get()
    g.rotation.y += delta * 0.16 + state.pointer.x * 0.004
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.15 + p * 0.5 + state.pointer.y * 0.08, 0.06)
    g.position.y = THREE.MathUtils.lerp(g.position.y, -p * 1.4, 0.08)
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.15, 0.05)
    const s = 1 - p * 0.12
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.08))
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <Sphere args={[1.08, 48, 48]}>
          <MeshDistortMaterial color="#2563EB" distort={0.32} speed={1.6} roughness={0.2} metalness={0.3} opacity={0.92} transparent />
        </Sphere>
        <Icosahedron args={[1.85, 0]}>
          <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.16} />
        </Icosahedron>
        <Icosahedron args={[2.35, 1]}>
          <meshBasicMaterial color="#B9CFF6" wireframe transparent opacity={0.12} />
        </Icosahedron>
      </Float>
      <Sparkles count={45} scale={4.4} size={2.2} speed={0.3} opacity={0.6} color="#2563EB" />
    </group>
  )
}

interface HeroSceneProps {
  scrollProgress: MotionValue<number>
}

export function HeroScene({ scrollProgress }: HeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  // Generous margin so the render loop spins back up just before the canvas
  // scrolls into view, and stops as soon as it's comfortably off-screen —
  // an always-on WebGL loop was the main cause of scroll jank.
  const active = useInView(wrapRef, { margin: '200px 0px 200px 0px' })

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 4, 4]} intensity={1.2} />
        <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#B9CFF6" />
        <Core scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
