/* eslint-disable react/no-unknown-property */
'use client';

// KITA BUNGKAM WARNING THREE.JS DI SINI BRAY (Aman buat Turbopack)
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    // Jika log mengandung kata kunci dari library 3D, langsung skip/abaikan bray
    if (
      args[0]?.toString().includes('THREE.Clock') || 
      args[0]?.toString().includes('deprecated') ||
      args[0]?.toString().includes('MeshLine')
    ) {
      return;
    }
    originalWarn(...args);
  };
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

const cardGLB = '/assets/lanyard/card.glb';
const lanyard = '/assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

export default function LanyardScene({
  position = [0, 0, 5.5],
  gravity = [0, -45, 0],
  fov = 30,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 0.06
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative block overflow-visible">
      <Canvas
        // 1. Matikan bayangan (shadows) kalau gak kepake, ini berat banget di mobile/Lighthouse
        shadows={false} 
        camera={{ position: position, fov: fov, near: 0.1, far: 100 }}
        
        // 2. Batasi Device Pixel Ratio (DPR). Jangan biarin nembak ke dpr 3 (bikin ngelag di layar retina/4K)
        dpr={[1, 1.5]} 
        
        // 3. Tambahkan properti powerPreference untuk maksa pake performa tinggi bray
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: false 
        }}
      >
        <ambientLight intensity={1.5} />
        <Physics gravity={gravity}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 0.06
}: BandProps) {
  const band = useRef<any>(null);
  
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Quaternion();
  const dir = new THREE.Vector3();

  const segmentProps = { canSleep: true, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB) as any;
  
  const texture = useTexture(lanyardImage || lanyard) as THREE.Texture;
  const frontTex = useTexture(frontImage || BLANK_PIXEL) as THREE.Texture;
  const backTex = useTexture(backImage || BLANK_PIXEL) as THREE.Texture;

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: HTMLImageElement, rect: { x: number; y: number; w: number; h: number }) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3 as any, card as any, [[0, 0, 0], [0, 1.4, 0]]); // Fix gantungan biar pas di atas lubang kartu

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach(ref => {
        const currentRef = ref.current as any;
        if (!currentRef.lerped) currentRef.lerped = new THREE.Vector3().copy(currentRef.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, currentRef.lerped.distanceTo(currentRef.translation())));
        currentRef.lerped.lerp(currentRef.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation() as THREE.Vector3);
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation() as THREE.Vector3);
      
      if (band.current.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      
      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.copy(card.current.rotation() as THREE.Quaternion);
      const euler = new THREE.Euler().setFromQuaternion(rot);
      
      // Diubah jadi dikali 0.02 biar gak nahan rotasi pas ditarik mouse bray!
      card.current.setAngvel({ x: ang.x, y: ang.y - euler.y * 0.02, z: ang.z }, true);
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic"><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic"><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic"><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          
          {/* DI SINI KITA PUTAR MATALANYA BRAY! Tambah rotation={[0, Math.PI, 0]} */}
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            rotation={[0, 0, 0]} 
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => { const t = e.target as any; t.releasePointerCapture?.(e.pointerId); drag(false); }}
            onPointerDown={e => {
              const t = e.target as any; t.setPointerCapture?.(e.pointerId);
              if (card.current) {
                const cardTrans = card.current.translation();
                drag(new THREE.Vector3().copy(e.point).sub(vec.set(cardTrans.x, cardTrans.y, cardTrans.z)));
              }
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={cardMap} map-anisotropy={16} clearcoat={0} clearcoatRoughness={0.5} roughness={0.2} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      
      {/* Tali Lanyard Loop */}
      <mesh ref={band}>
        <primitive object={new MeshLineGeometry()} attach="geometry" />
        <primitive 
          object={new MeshLineMaterial({
            color: "white",
            resolution: isMobile ? new THREE.Vector2(1000, 2000) : new THREE.Vector2(1000, 1000),
            useMap: 1,
            map: texture,
            repeat: new THREE.Vector2(-4, 1),
            lineWidth: lanyardWidth,
            depthTest: true
          })} 
          attach="material"
        />
      </mesh>
    </>
  );
}