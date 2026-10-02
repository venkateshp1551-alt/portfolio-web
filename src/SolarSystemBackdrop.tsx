import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const planets = [
  { radius: 1.05, size: 0.15, color: 0xb5c8e8, speed: 0.72, tilt: 0.04 },
  { radius: 1.55, size: 0.21, color: 0xe5a77e, speed: 0.54, tilt: -0.08 },
  { radius: 2.12, size: 0.25, color: 0x719ce0, speed: 0.4, tilt: 0.1 },
  { radius: 2.8, size: 0.2, color: 0xd77863, speed: 0.31, tilt: -0.12 },
  { radius: 3.7, size: 0.39, color: 0xc8a677, speed: 0.21, tilt: 0.07, ring: true },
  { radius: 4.75, size: 0.32, color: 0xd5bf91, speed: 0.15, tilt: -0.06 },
  { radius: 5.75, size: 0.27, color: 0x79b4c5, speed: 0.11, tilt: 0.13 },
];

function makeGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const glow = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  glow.addColorStop(0, 'rgba(255, 231, 185, 0.72)');
  glow.addColorStop(0.18, 'rgba(255, 191, 105, 0.2)');
  glow.addColorStop(1, 'rgba(255, 177, 88, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function addStars(scene: THREE.Scene) {
  const count = 780;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cool = new THREE.Color(0x91b9ff);
  const warm = new THREE.Color(0xf5d9ac);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 25;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 8;
    const color = Math.random() > 0.78 ? warm : cool;
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.034,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });
  scene.add(new THREE.Points(geometry, material));
}

function addOrbit(parent: THREE.Object3D, radius: number, tilt: number) {
  const points: THREE.Vector3[] = [];
  for (let index = 0; index <= 160; index += 1) {
    const angle = (index / 160) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius * 0.66;
    points.push(new THREE.Vector3(x, z * Math.sin(tilt), z * Math.cos(tilt)));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x91a9d7,
    transparent: true,
    opacity: radius > 4.5 ? 0.19 : 0.29,
    depthWrite: false,
  });
  parent.add(new THREE.Line(geometry, material));
}

export default function SolarSystemBackdrop() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      host.classList.add('solar-system-fallback');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-8, 8, 7, -7, 0.1, 100);
    camera.position.set(0, 10, 19);
    camera.lookAt(0, 0, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'solar-system-canvas';
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x8799c0, 1.5));
    const sunlight = new THREE.PointLight(0xffd9a4, 58, 24, 2);
    scene.add(sunlight);
    addStars(scene);

    const system = new THREE.Group();
    scene.add(system);
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 40, 32),
      new THREE.MeshBasicMaterial({ color: 0xffd99b }),
    );
    system.add(sun);

    const glowTexture = makeGlowTexture();
    if (glowTexture) {
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffbf76,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
      glow.scale.set(4.2, 4.2, 1);
      system.add(glow);
    }

    const planetGroups: { group: THREE.Group; speed: number }[] = [];
    planets.forEach(({ radius, size, color, speed, tilt, ring }) => {
      addOrbit(system, radius, tilt);
      const group = new THREE.Group();
      group.rotation.z = tilt;
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(size, 28, 20),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.04, roughness: 0.68, metalness: 0.08 }),
      );
      planet.position.set(radius, 0, 0);
      group.add(planet);

      if (ring) {
        const ringMesh = new THREE.Mesh(
          new THREE.TorusGeometry(size * 1.55, size * 0.12, 6, 72),
          new THREE.MeshBasicMaterial({ color: 0xd7c29a, transparent: true, opacity: 0.62 }),
        );
        ringMesh.rotation.x = Math.PI / 2.35;
        planet.add(ringMesh);
      }

      system.add(group);
      planetGroups.push({ group, speed });
    });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      const aspect = width / height;
      const compact = aspect < 0.72;
      const medium = aspect < 1.15;
      const viewHeight = compact ? 12.5 : medium ? 14.5 : 14;
      const scale = compact ? 0.32 : medium ? 0.78 : 1;
      camera.left = (-viewHeight * aspect) / 2;
      camera.right = (viewHeight * aspect) / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      system.scale.setScalar(scale);
      system.position.set(compact ? 0 : medium ? 1.8 : 2.5, compact ? 1.7 : medium ? 2.5 : 3.1, 0);
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const clock = new THREE.Clock();
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId: number | null = null;
    let disposed = false;

    const animate = () => {
      if (disposed || document.hidden) {
        frameId = null;
        return;
      }
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const motionScale = motionPreference.matches ? 0.18 : 1;
      planetGroups.forEach(({ group, speed }) => { group.rotation.y += delta * speed * motionScale; });
      sun.rotation.y += delta * 0.12 * motionScale;
      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (!document.hidden && frameId === null) {
        clock.start();
        frameId = requestAnimationFrame(animate);
      }
    };
    const handleVisibility = () => {
      if (document.hidden && frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      } else {
        startAnimation();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    startAnimation();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      disposed = true;
      if (frameId !== null) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if ('map' in material && material.map instanceof THREE.Texture) material.map.dispose();
            material.dispose();
          });
        }
      });
      glowTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="solar-system-backdrop" ref={hostRef} aria-hidden="true" />;
}