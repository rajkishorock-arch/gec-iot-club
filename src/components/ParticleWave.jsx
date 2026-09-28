import React, { useEffect, useRef } from 'react';

export const ParticleWave = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    // Particle grid settings for 3D dot matrix wave
    const cols = 55;
    const rows = 32;
    const separation = 28;
    let count = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      count += 0.025;

      const fov = 350;
      const cameraY = -80;
      const cameraZ = 300;

      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          // World 3D coordinates
          const x = (ix - cols / 2) * separation;
          const z = (iy - rows / 2) * separation + 200;

          // Undulating wave equation
          const wave1 = Math.sin(ix * 0.25 + count) * 45;
          const wave2 = Math.cos(iy * 0.25 + count * 0.8) * 35;
          const wave3 = Math.sin((ix + iy) * 0.15 + count) * 20;
          const y = wave1 + wave2 + wave3 + cameraY;

          // 3D to 2D projection
          const distance = z + cameraZ;
          if (distance <= 0) continue;

          const scale = fov / distance;
          const projX = x * scale + width / 2;
          const projY = y * scale + height / 2;

          // Distance fading and size calculation
          const alpha = Math.max(0.08, Math.min(0.75, 1 - distance / 1200));
          const size = Math.max(0.8, Math.min(2.8, scale * 1.8));

          // Draw particle
          ctx.beginPath();
          ctx.arc(projX, projY, size, 0, Math.PI * 2);

          // Color gradient from white to cyan depending on height
          if (wave1 > 10) {
            ctx.fillStyle = `rgba(0, 191, 251, ${alpha * 0.9})`; // Cyan glow
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`; // White/silver
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-60"
      />
      {/* Vignette mask so particles smoothly blend into black background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, black 85%)'
        }}
      />
    </div>
  );
};

export default ParticleWave;
