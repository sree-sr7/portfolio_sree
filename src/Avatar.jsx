import React, { useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

function HybridModel() {
  const group = useRef();
  
  // 1. LOAD BODY
  const { scene } = useGLTF('/avatar.glb');
  
  // 2. LOAD ANIMATION
  const { animations: fbxAnimations } = useFBX('/cheerful_avatar.fbx');

  // 3. SMART RETARGETING (Fixes Crushed Bones)
  const cleanedAnimations = useMemo(() => {
    if (!fbxAnimations || fbxAnimations.length === 0) return [];

    const clip = fbxAnimations[0].clone();
    clip.name = "HappyIdle";

    // Filter out the tracks that crush the body
    clip.tracks = clip.tracks.filter((track) => {
      // Clean the name first (remove mixamorig:)
      track.name = track.name.replace(/^mixamorig:?/, '');

      // CRITICAL FIX: 
      // If this is a "Position" track (moving the bone)...
      if (track.name.endsWith('.position')) {
        // ...ONLY keep it if it's the Hips (so he can breathe/bob up and down).
        // DELETE it for Shoulders/Neck/Spine so they don't crush.
        return track.name === 'Hips.position';
      }
      
      // Keep all "Quaternion" (Rotation) tracks
      return true;
    });

    return [clip];
  }, [fbxAnimations]);

  // 4. APPLY
  const { actions } = useAnimations(cleanedAnimations, group);

  useEffect(() => {
    if (actions["HappyIdle"]) {
      actions["HappyIdle"].reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} position={[0, -3.2, 0]} scale={2.3} />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="text-xs font-mono text-gray-500 animate-pulse tracking-widest whitespace-nowrap">
        LOADING_SYSTEM...
      </div>
    </Html>
  );
}

export default function Avatar() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4f46e5" />
      <Environment preset="city" />
      
      <Suspense fallback={<Loader />}>
        <HybridModel />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/avatar.glb");
useFBX.preload("/cheerful_avatar.fbx");