import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for all elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Microcontroller Core (ESP32/Chip style)
    const chipGeo = new THREE.BoxGeometry(2.4, 0.35, 2.4);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x090f1d,
      roughness: 0.3,
      metalness: 0.9,
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    mainGroup.add(chip);

    // Chip Top Plate with glowing label line
    const plateGeo = new THREE.BoxGeometry(1.8, 0.05, 1.8);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0f223d,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.25
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = 0.2;
    chip.add(plate);

    // Metallic Pins on sides
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.2
    });

    const createPins = (axis, sign) => {
      for (let i = -1; i <= 1; i += 0.4) {
        const pinGeo = new THREE.BoxGeometry(
          axis === 'x' ? 0.3 : 0.12,
          0.05,
          axis === 'z' ? 0.3 : 0.12
        );
        const pin = new THREE.Mesh(pinGeo, pinMat);
        if (axis === 'x') {
          pin.position.set(sign * 1.3, -0.05, i);
        } else {
          pin.position.set(i, -0.05, sign * 1.3);
        }
        chip.add(pin);
      }
    };
    createPins('x', 1);
    createPins('x', -1);
    createPins('z', 1);
    createPins('z', -1);

    // 2. Glowing Rings (Orbital data buses)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ringGeo1 = new THREE.RingGeometry(3.2, 3.25, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    mainGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const ringGeo2 = new THREE.RingGeometry(4.5, 4.54, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.3;
    ring2.rotation.y = 0.2;
    mainGroup.add(ring2);

    // 3. Orbiting IoT Nodes (Sensors, Cloud, Gateway)
    const nodeColors = [0x00f2fe, 0x10b981, 0x38bdf8, 0xf59e0b];
    const nodes = [];

    nodeColors.forEach((color, idx) => {
      const nodeGroup = new THREE.Group();
      
      // Node core
      const nodeGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeGroup.add(nodeMesh);

      // Node subtle halo
      const haloGeo = new THREE.RingGeometry(0.28, 0.34, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      nodeGroup.add(halo);

      mainGroup.add(nodeGroup);
      nodes.push({
        group: nodeGroup,
        radius: 3.2 + (idx % 2) * 1.3,
        speed: 0.008 + idx * 0.004,
        angle: (idx * Math.PI) / 2
      });
    });

    // 4. Data Particle Cloud (Telemetry Signals)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.06,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3, 15);
    cyanLight.position.set(3, 4, 3);
    scene.add(cyanLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.5, 15);
    emeraldLight.position.set(-3, -2, -3);
    scene.add(emeraldLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y += 0.003;
      mainGroup.rotation.x = mouseY + 0.35;
      mainGroup.rotation.z = mouseX * 0.5;

      // Update Node positions along circular orbits
      nodes.forEach((node) => {
        node.angle += node.speed;
        node.group.position.x = Math.cos(node.angle) * node.radius;
        node.group.position.z = Math.sin(node.angle) * node.radius;
        node.group.position.y = Math.sin(node.angle * 2) * 0.4;
      });

      // Slowly rotate particle field
      particles.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[550px] flex items-center justify-center">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Subtle overlay badges / telemetry indicators */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-400 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Telemetry Stream: Active 3D Node Mesh</span>
      </div>

      <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
        <span>Freq: 2.4GHz / 868MHz LoRa</span>
      </div>
    </div>
  );
};

export default Hero3D;
