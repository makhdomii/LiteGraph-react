import { useEffect, useState } from 'react';

export function useCanvasSize(offsetY: number): { width: number; height: number } {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? Math.max(320, window.innerHeight - offsetY) : 720,
  }));

  useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth,
        height: Math.max(320, window.innerHeight - offsetY),
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [offsetY]);

  return size;
}
