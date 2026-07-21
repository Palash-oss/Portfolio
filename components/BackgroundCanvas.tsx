import React, { useEffect, useRef } from 'react';

interface GridNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  scale: number;
  targetScale: number;
  brightness: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const gridSpacing = 60;
    let cols = Math.ceil(width / gridSpacing) + 2;
    let rows = Math.ceil(height / gridSpacing) + 2;
    let nodes: GridNode[][] = [];

    const initGrid = () => {
      cols = Math.ceil(width / gridSpacing) + 2;
      rows = Math.ceil(height / gridSpacing) + 2;
      nodes = [];

      for (let i = 0; i <= cols; i++) {
        nodes[i] = [];
        const bx = i * gridSpacing;
        for (let j = 0; j <= rows; j++) {
          const by = j * gridSpacing;
          nodes[i][j] = {
            x: bx,
            y: by,
            baseX: bx,
            baseY: by,
            vx: 0,
            vy: 0,
            scale: 2.2,
            targetScale: 2.2,
            brightness: 0.25,
          };
        }
      }
    };

    initGrid();

    const hoverRadius = 180;

    const render = () => {
      // Interpolate smooth mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Update grid nodes
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const n = nodes[i][j];

          const dx = n.baseX - mouse.x;
          const dy = n.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius && mouse.isHovered) {
            const factor = Math.pow(1 - dist / hoverRadius, 2);
            n.targetScale = 2.2 + factor * 5.5; // Circle pops up to 7.7px
            n.brightness = 0.25 + factor * 0.75; // Brightness up to 1.0

            // Gentle spring offset towards mouse
            const force = factor * 12;
            const angle = Math.atan2(dy, dx);
            const targetX = n.baseX - Math.cos(angle) * force;
            const targetY = n.baseY - Math.sin(angle) * force;

            n.x += (targetX - n.x) * 0.2;
            n.y += (targetY - n.y) * 0.2;
          } else {
            n.targetScale = 2.2;
            n.brightness += (0.25 - n.brightness) * 0.1;

            // Spring back to base position
            n.x += (n.baseX - n.x) * 0.15;
            n.y += (n.baseY - n.y) * 0.15;
          }

          n.scale += (n.targetScale - n.scale) * 0.2;
        }
      }

      // Draw Grid Lines (Bold, Sharp, Uniform Silver Grid)
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const n = nodes[i][j];

          // Horizontal line to right neighbor
          if (i < cols) {
            const nRight = nodes[i + 1][j];
            const maxBright = Math.max(n.brightness, nRight.brightness);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nRight.x, nRight.y);
            ctx.strokeStyle = maxBright > 0.3 ? `rgba(255, 255, 255, ${maxBright * 0.6})` : 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = maxBright > 0.3 ? 1.4 : 0.8;
            ctx.stroke();
          }

          // Vertical line to bottom neighbor
          if (j < rows) {
            const nBottom = nodes[i][j + 1];
            const maxBright = Math.max(n.brightness, nBottom.brightness);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nBottom.x, nBottom.y);
            ctx.strokeStyle = maxBright > 0.3 ? `rgba(255, 255, 255, ${maxBright * 0.6})` : 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = maxBright > 0.3 ? 1.4 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Interactive Small Intersection Circles
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const n = nodes[i][j];

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.scale, 0, Math.PI * 2);

          if (n.brightness > 0.4) {
            // Glowing popped up circle on hover
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = Math.min(n.brightness * 1.2, 1);
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = (n.scale - 2.2) * 2;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.globalAlpha = n.brightness;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};
