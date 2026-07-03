import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CoreHub() {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
      coreRef.current.rotation.x += delta * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.z -= delta * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.03;
      wireRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Inner Glowing Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#6366f1" emissive="#4338ca" emissiveIntensity={0.8} wireframe={false} opacity={0.9} transparent />
      </mesh>
      {/* Outer Wireframe Shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#c084fc" wireframe={true} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.3;
    if (ring2.current) ring2.current.rotation.y += delta * 0.4;
    if (ring3.current) ring3.current.rotation.z -= delta * 0.2;
  });

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.015, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function DataSwarm() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 80;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 2.5; // Orbit between 2.5 and 5
      const speed = 0.5 + Math.random() * 1.5;
      const yOffset = (Math.random() - 0.5) * 6; // Spread out vertically
      temp.push({ t, radius, speed, yOffset });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    particles.forEach((p, i) => {
      // Calculate current angle
      const angle = p.t + time * p.speed;
      
      // Calculate position
      const x = Math.cos(angle) * p.radius;
      const z = Math.sin(angle) * p.radius;
      // Add a slight bobbing motion
      const y = Math.sin(time * 2 + i) * 0.5 + p.yOffset;
      
      dummy.position.set(x, y, z);
      
      // Look at the next point to orient the "ship" forward
      const nextAngle = angle + 0.1;
      const nextX = Math.cos(nextAngle) * p.radius;
      const nextZ = Math.sin(nextAngle) * p.radius;
      dummy.lookAt(nextX, y, nextZ);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.06, 0.25, 4]} />
      {/* Golden glow for data packets */}
      <meshBasicMaterial color="#fcd34d" />
    </instancedMesh>
  );
}

export default function Transport3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.5}>
          <CoreHub />
          <OrbitalRings />
          <DataSwarm />
        </Float>
        
        {/* Subtle background stars to enhance depth */}
        <Stars radius={50} depth={50} count={2000} factor={2} saturation={1} fade speed={1} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
