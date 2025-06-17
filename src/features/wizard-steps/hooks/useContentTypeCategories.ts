import { useEffect, useState, useCallback } from 'react';
import { ContentType, RequestFormData } from '@/types/types';
import { useTags } from '@/hooks/useTags';


export const useContentTypeCategories = (
  initial: RequestFormData | undefined,
  onChange: (d: RequestFormData) => void,
) => {
  // allow '' so the step starts “un-chosen”
  const [contentType, setContentType] = useState<ContentType | ''>(
    initial?.contentType ?? '',
  );
  const [otherContentType, setOtherContentType] = useState(initial?.otherContentType ?? '');
  const [tagInput, setTagInput] = useState('');
  const { tags, add: addTag, remove: removeTag } = useTags(initial?.tags);

  /* ---------- derived helpers ---------- */
  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag(tagInput.trim());
        setTagInput('');
      }
    },
    [addTag, tagInput],
  );

  
  useEffect(() => {
    onChange({
      ...initial!,               // keep title/content/image unchanged
      contentType,
      otherContentType,
      tags,
    });
  }, [contentType, otherContentType, tags, onChange]); 

  return {
    /* state */
    contentType,
    otherContentType,
    tags,
    tagInput,
    /* setters */
    setContentType,
    setOtherContentType,
    setTagInput,
    /* actions */
    addTag,
    removeTag,
    handleTagKeyDown,
    /* validity */
    canProceed: !!contentType,
  };
};
