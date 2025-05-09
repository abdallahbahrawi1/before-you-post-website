import { useState, useEffect } from 'react';

export function useFadeIn(delay = 20) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return isVisible;
}
