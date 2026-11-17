"use client";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Sayfanın arkasında sabit duran 3D sahne (three.js / React Three Fiber).
 * Sayfa kaydırıldıkça kamera aşağı doğru yol alır: önce iki oklu logo,
 * ardından tel kafes halkalar ve süzülen parçacıklar geçer.
 */

const DEPTH = 26; // kameranın sayfa boyunca kat ettiği mesafe
const HOLO = ["#7cf7ff", "#b79cff", "#ff8fd8", "#f4f2ee"];

// Kaydırma ve imleç durumu: React dışında tutulur, her karede okunur
const input = { scroll: 0, target: 0, px: 0, py: 0 };

function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Rig() {
  useFrame(({ camera }, dt) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    input.target = max > 0 ? window.scrollY / max : 0;
    input.scroll += (input.target - input.scroll) * Math.min(1, dt * 5);
    const y = -input.scroll * DEPTH + input.py * 0.3;
    camera.position.y += (y - camera.position.y) * Math.min(1, dt * 6);
    camera.position.x += (input.px * 0.7 - camera.position.x) * Math.min(1, dt * 2.5);
    camera.lookAt(0, camera.position.y - input.py * 0.15, 0);
  });
  return null;
}

/* ---------- İki oklu logo şekli ---------- */

// Tek okun ölçüleri (kol genişliği 1 birim): eğim, yarı yükseklik, kalınlık ve kenar yuvarlaması
const ARM = 1;
const SLANT = 0.89;
const HALF = 0.98;
const THICK = 0.3;
const BEVEL = 0.13;
const CORNER = 0.27; // okların köşe yuvarlama yarıçapı
const SPIN_PER_PIXEL = 0.02; // kaydırılan her piksel için takla açısı (radyan): bir ekran boyu yaklaşık üç tur

/** Köşeleri yuvarlatılmış çokgen. Her köşede yay yarıçapı aynı kalsın diye
 *  kesme mesafesi köşe açısına göre hesaplanır (dar açıda daha uzun). */
function roundedShape(points: [number, number][], radius: number) {
  const shape = new THREE.Shape();
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const cur = new THREE.Vector2(...points[i]);
    const toPrev = new THREE.Vector2(...points[(i + n - 1) % n]).sub(cur);
    const toNext = new THREE.Vector2(...points[(i + 1) % n]).sub(cur);
    const angle = Math.acos(THREE.MathUtils.clamp(toPrev.clone().normalize().dot(toNext.clone().normalize()), -1, 1));
    const cut = Math.min(radius / Math.tan(angle / 2), toPrev.length() * 0.45, toNext.length() * 0.45);
    const a = cur.clone().add(toPrev.setLength(cut));
    const b = cur.clone().add(toNext.setLength(cut));
    if (i === 0) shape.moveTo(a.x, a.y);
    else shape.lineTo(a.x, a.y);
    shape.quadraticCurveTo(cur.x, cur.y, b.x, b.y);
  }
  shape.closePath();
  return shape;
}

/** p noktasının ab doğru parçasına en yakın noktası */
function closestOnSegment(p: THREE.Vector2, a: THREE.Vector2, b: THREE.Vector2) {
  const ab = b.clone().sub(a);
  const t = THREE.MathUtils.clamp(p.clone().sub(a).dot(ab) / ab.lengthSq(), 0, 1);
  return a.clone().add(ab.multiplyScalar(t));
}

/** Sola bakan tek ok ("<"): kalın, kenarları yuvarlatılmış, yüzeyi hafif kabarık görünen gövde */
function chevronGeometry() {
  const cx = (SLANT + ARM) / 2;
  const outline: [number, number][] = [
    [0, 0],
    [SLANT, -HALF],
    [SLANT + ARM, -HALF],
    [ARM, 0],
    [SLANT + ARM, HALF],
    [SLANT, HALF],
  ].map(([x, y]) => [x - cx, y]);

  const extruded = new THREE.ExtrudeGeometry(roundedShape(outline, CORNER), {
    depth: THICK,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelOffset: -BEVEL,
    bevelSegments: 14,
    curveSegments: 24,
  });
  extruded.translate(0, 0, -THICK / 2);
  extruded.deleteAttribute("uv");
  extruded.deleteAttribute("normal");
  const geometry = mergeVertices(extruded, 1e-4);
  extruded.dispose();
  geometry.computeVertexNormals();

  // Ön ve arka yüz düzdür; normalleri kolun orta çizgisinden dışa doğru eğerek
  // ışığın yüzeyde kabarıkmış gibi yumuşak geçişle yansımasını sağlarız.
  const elbow = new THREE.Vector2(ARM / 2 - cx, 0);
  const ends = [new THREE.Vector2(SLANT + ARM / 2 - cx, HALF), new THREE.Vector2(SLANT + ARM / 2 - cx, -HALF)];
  const position = geometry.getAttribute("position");
  const normal = geometry.getAttribute("normal");
  const top = THICK / 2 + BEVEL - 1e-3;
  const p = new THREE.Vector2();
  const n = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    const z = position.getZ(i);
    if (Math.abs(z) < top) continue;
    p.set(position.getX(i), position.getY(i));
    const q0 = closestOnSegment(p, elbow, ends[0]);
    const q1 = closestOnSegment(p, elbow, ends[1]);
    const q = p.distanceToSquared(q0) < p.distanceToSquared(q1) ? q0 : q1;
    const out = p.clone().sub(q);
    const tilt = Math.min(1, out.length() / 0.37) * 0.62;
    out.normalize();
    n.set(out.x * tilt, out.y * tilt, Math.sign(z)).normalize();
    normal.setXYZ(i, n.x, n.y, n.z);
  }
  normal.needsUpdate = true;
  return geometry;
}

/** Logo: iki ok ("<" ve ">") çaprazlama durur; hafifçe salınır, imlece ve kaydırmaya tepki verir */
function Chevrons({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => chevronGeometry(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  // Kaydırmayla gelen takla: açı, açısal hız ve son kaydırma konumu
  const spin = useRef({ angle: 0, velocity: 0, lastY: -1 });

  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g) return;
    const t = still ? 0 : clock.elapsedTime;

    // Sayfa kaydıkça logo yatay eksen etrafında takla atar; hız kaydırma hızıyla orantılıdır.
    // Kaydırma durunca yavaşlar ve en yakın tam turda, yani düz konumda durur.
    const sp = spin.current;
    if (!still) {
      const y = window.scrollY;
      const step = Math.min(Math.max(dt, 0.001), 0.05);
      const scrollSpeed = sp.lastY < 0 ? 0 : (y - sp.lastY) / step; // piksel/saniye
      sp.lastY = y;
      sp.velocity += (scrollSpeed * SPIN_PER_PIXEL - sp.velocity) * (1 - Math.exp(-step * 6));
      sp.angle += sp.velocity * step;
      if (Math.abs(sp.velocity) < 1.2) {
        const rest = Math.round(sp.angle / (Math.PI * 2)) * Math.PI * 2;
        sp.angle += (rest - sp.angle) * (1 - Math.exp(-step * 3.5));
      }
    }

    g.rotation.y = -0.2 + Math.sin(t * 0.95) * 0.5 + input.px * 0.3;
    g.rotation.x = 0.16 + Math.sin(t * 0.7) * 0.16 - input.py * 0.22 + sp.angle;
    g.rotation.z = Math.sin(t * 0.55) * 0.06;
    // iki parça nefes alır gibi hafifçe açılıp kapanır
    const gap = Math.sin(t * 1.2) * 0.045;
    left.current?.position.set(-0.71 - gap, 0.435 + gap * 0.6, 0);
    right.current?.position.set(0.71 + gap, -0.435 - gap * 0.6, 0);
  });

  const material = (
    <meshPhysicalMaterial
      color="#a98cff"
      metalness={1}
      roughness={0.22}
      iridescence={1}
      iridescenceIOR={1.8}
      iridescenceThicknessRange={[180, 620]}
      clearcoat={1}
      clearcoatRoughness={0.12}
      envMapIntensity={1.7}
    />
  );

  return (
    <group ref={group} scale={1.06}>
      <mesh ref={left} geometry={geometry} position={[-0.71, 0.435, 0]}>
        {material}
      </mesh>
      <mesh ref={right} geometry={geometry} position={[0.71, -0.435, 0]} rotation={[0, 0, Math.PI]}>
        {material}
      </mesh>
    </group>
  );
}

/** Hero'daki ana parça: iki oklu logo ve çevresinde dönen sekiz küçük şekil.
 *  Ana sayfada büyük ve önde durur; iç sayfalarda küçülüp köşeye çekilir. */
function Centerpiece({ still, home }: { still: boolean; home: boolean }) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const wide = useThree((s) => s.size.width >= 900);
  const target = useMemo(() => {
    const [x, y, z, scale] = wide ? (home ? [2.95, 0.1, 0, 1] : [5.3, 1.7, -3.5, 0.62]) : home ? [0, 1.85, -1, 0.74] : [2.0, 4.1, -6, 0.36];
    return { position: new THREE.Vector3(x, y, z), scale };
  }, [wide, home]);
  const placed = useRef(false);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    // İlk karede yerine koy, sonrasında hedefe doğru yumuşakça kaydır
    const k = placed.current && !still ? 1 - Math.exp(-dt * 3) : 1;
    placed.current = true;
    g.position.lerp(target.position, k);
    g.scale.setScalar(g.scale.x + (target.scale - g.scale.x) * k);
    if (!orbit.current || still) return;
    orbit.current.rotation.y -= dt * 0.25;
    orbit.current.rotation.z += dt * 0.06;
  });

  const satellites = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r = 2.9 + (i % 3) * 0.35;
        return { key: i, position: [Math.cos(a) * r, Math.sin(a * 2) * 0.9, Math.sin(a) * r] as const, color: HOLO[i % HOLO.length] };
      }),
    [],
  );

  return (
    <group ref={group}>
      <Chevrons still={still} />
      <group ref={orbit} rotation={[0.5, 0, 0.2]} scale={0.84}>
        {satellites.map((s) => (
          <Float key={s.key} speed={still ? 0 : 2} rotationIntensity={1.6} floatIntensity={0.6}>
            <mesh position={s.position} scale={0.2 + (s.key % 3) * 0.05}>
              {s.key === 0 && <boxGeometry args={[1.4, 1, 0.3]} />}
              {s.key === 1 && <capsuleGeometry args={[0.45, 0.9, 6, 16]} />}
              {s.key === 2 && <torusGeometry args={[0.6, 0.26, 16, 40]} />}
              {s.key === 3 && <octahedronGeometry args={[0.85]} />}
              {s.key === 4 && <icosahedronGeometry args={[0.8]} />}
              {s.key === 5 && <coneGeometry args={[0.7, 1.2, 4]} />}
              {s.key === 6 && <cylinderGeometry args={[0.6, 0.6, 0.9, 24]} />}
              {s.key === 7 && <dodecahedronGeometry args={[0.8]} />}
              <meshStandardMaterial color={s.color} metalness={0.7} roughness={0.22} emissive={s.color} emissiveIntensity={0.18} />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
}

/** Derinlik boyunca süzülen küçük kristaller (tek çizim çağrısı) */
function Debris({ still }: { still: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 150;
  const items = useMemo(() => {
    const rand = seeded(20211);
    return Array.from({ length: count }, () => {
      const side = rand() < 0.5 ? -1 : 1;
      return {
        // ortayı (metnin olduğu yeri) seyrek, kenarları yoğun tut
        x: side * (3.9 + rand() * 7.5),
        y: 3 - rand() * (DEPTH + 9),
        z: -10 + rand() * 8,
        s: 0.05 + rand() * rand() * 0.38,
        rx: rand() * 6.3,
        ry: rand() * 6.3,
        spin: (rand() - 0.5) * 0.8,
        color: HOLO[Math.floor(rand() * HOLO.length)],
      };
    });
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const place = (t: number) => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      const it = items[i];
      dummy.position.set(it.x, it.y + Math.sin(t * 0.3 + i) * 0.15, it.z);
      dummy.rotation.set(it.rx + t * it.spin, it.ry + t * it.spin * 0.7, 0);
      dummy.scale.setScalar(it.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const color = new THREE.Color();
    items.forEach((it, i) => mesh.setColorAt(i, color.set(it.color)));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    place(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    if (!still) place(clock.elapsedTime);
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial metalness={0.85} roughness={0.25} flatShading />
    </instancedMesh>
  );
}

/** Yolculuk boyunca geçilen büyük tel kafes şekiller */
function Wires({ still }: { still: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (still) return;
    if (a.current) a.current.rotation.z += dt * 0.08;
    if (b.current) {
      b.current.rotation.x += dt * 0.06;
      b.current.rotation.y += dt * 0.09;
    }
    if (c.current) c.current.rotation.z -= dt * 0.05;
  });
  return (
    <>
      <mesh ref={a} position={[-5.2, -DEPTH * 0.3, -3]} rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[3.2, 0.9, 14, 48]} />
        <meshBasicMaterial color="#7cf7ff" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={b} position={[5.6, -DEPTH * 0.62, -4]}>
        <icosahedronGeometry args={[3.4, 1]} />
        <meshBasicMaterial color="#ff8fd8" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh ref={c} position={[0, -DEPTH - 0.4, -6]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[6.5, 0.05, 8, 120]} />
        <meshBasicMaterial color="#b79cff" transparent opacity={0.55} />
      </mesh>
    </>
  );
}

export default function Scene({ home = true }: { home?: boolean }) {
  const still = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      input.px = (e.clientX / window.innerWidth) * 2 - 1;
      input.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 9.5], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <color attach="background" args={["#07070a"]} />
      <fog attach="fog" args={["#07070a", 9, 25]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 6]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, -2, 4]} intensity={30} color="#7cf7ff" />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#050508"]} />
        <Lightformer form="rect" intensity={7} color="#58e6ff" position={[-7, 3, 4]} scale={[6, 9, 1]} />
        <Lightformer form="rect" intensity={8} color="#e06bff" position={[7, -2, 3]} scale={[6, 9, 1]} />
        <Lightformer form="ring" intensity={9} color="#9a7bff" position={[0, 7, -3]} scale={7} />
        <Lightformer form="rect" intensity={5} color="#6a4dff" position={[0, -7, 2]} scale={[12, 3, 1]} />
        <Lightformer form="circle" intensity={2.2} color="#c9a8ff" position={[0, 0, 9]} scale={3} />
      </Environment>
      <Rig />
      <Centerpiece still={still} home={home} />
      <Debris still={still} />
      <Wires still={still} />
    </Canvas>
  );
}
