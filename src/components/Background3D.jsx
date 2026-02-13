import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Orb = (props) => {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.position.y += Math.sin(state.clock.elapsedTime + props.offset) * 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <mesh ref={mesh} {...props}>
                <sphereGeometry args={[props.scale, 32, 32]} />
                <meshStandardMaterial
                    color={props.color}
                    emissive={props.color}
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
        </Float>
    );
}

const FloatingOrbs = ({ count = 20 }) => {
    const orbs = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            ],
            scale: Math.random() * 0.3 + 0.1,
            offset: Math.random() * 100,
            key: Math.random(),
            color: Math.random() > 0.5 ? '#d4af37' : '#ff4d4d'
        }))
    }, [count]);

    return (
        <group>
            {orbs.map(o => (
                <Orb key={o.key} position={o.position} scale={o.scale} offset={o.offset} color={o.color} />
            ))}
        </group>
    )
}

const Scene = ({ stage }) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff4d4d" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {(stage === 'landing' || stage === 'wife-msg') && (
                <>
                    <FloatingOrbs count={30} />
                    <Sparkles count={200} scale={12} size={4} speed={0.4} opacity={0.7} color="#d4af37" />
                </>
            )}

            {stage === 'letter' && (
                <Sparkles count={500} scale={15} size={3} speed={0.2} opacity={0.8} color="#ff4d4d" />
            )}

            {stage === 'auth' && (
                <Sparkles count={1000} scale={20} size={1} speed={2} color="#ff0000" noise={1} />
            )}

            {stage === 'gallery' && (
                <Sparkles count={300} scale={15} size={2} speed={0.1} color="#d4af37" />
            )}
        </>
    );
};

export default function Background3D({ stage }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
                <Scene stage={stage} />
            </Canvas>
        </div>
    );
}
