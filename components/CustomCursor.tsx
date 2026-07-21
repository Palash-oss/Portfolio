import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hoverState, setHoverState] = useState<{ isHovered: boolean; text?: string }>({
    isHovered: false,
    text: '',
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.3 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveElement = target.closest('a, button, input, textarea, [data-cursor], .cursor-pointer');
      
      if (interactiveElement) {
        const cursorAttr = interactiveElement.getAttribute('data-cursor');
        const isButton = interactiveElement.tagName === 'BUTTON' || interactiveElement.tagName === 'A';
        
        setHoverState({
          isHovered: true,
          text: cursorAttr || (isButton ? 'EXPLORE' : ''),
        });
      } else {
        setHoverState({ isHovered: false, text: '' });
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Primary Inner Pointer */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[400001] shadow-[0_0_12px_rgba(255,255,255,0.9)] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverState.isHovered ? 0.3 : 1,
          opacity: hoverState.isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing Interactive Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-white/60 rounded-full pointer-events-none z-[400000] flex items-center justify-center will-change-transform"
        animate={{
          width: hoverState.text ? 72 : hoverState.isHovered ? 48 : 34,
          height: hoverState.text ? 72 : hoverState.isHovered ? 48 : 34,
          backgroundColor: hoverState.isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          borderColor: hoverState.isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.3)',
        }}
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
      >
        {hoverState.text && (
          <span className="mono text-[9px] font-black text-white uppercase tracking-widest pointer-events-none select-none text-center px-1">
            {hoverState.text}
          </span>
        )}
      </motion.div>
    </>
  );
};
