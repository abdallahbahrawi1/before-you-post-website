import { useCallback, useState } from 'react';

/** Generic tag manager – re-use in any component */
export const useTags = (initial: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initial);

  const add = useCallback((t: string) => {
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
  }, [tags]);

  const remove = useCallback((t: string) =>
    setTags(prev => prev.filter(x => x !== t)), []);

  return { tags, add, remove };
};
