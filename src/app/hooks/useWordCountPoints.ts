// src/hooks/useWordCountPoints.ts
import { useState, useEffect } from "react";

export function useWordCountPoints(
  text: string,
  wordsPerPoint = 10
): number {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    setPoints(Math.floor(count / wordsPerPoint));
  }, [text, wordsPerPoint]);

  return points;
}
