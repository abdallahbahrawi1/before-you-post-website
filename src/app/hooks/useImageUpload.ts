import { useState, useEffect, ChangeEvent, DragEvent, useRef } from "react";

export interface ImageUploadProps {
  initialUrl: string | null;
  onChange: (data: string | null) => void;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}


export const useImageUpload = ({
  initialUrl,
  onChange,
  maxSizeMB = 2,
  acceptedTypes = ["image/jpeg", "image/png"],
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl || "" );
  const [error, setError] = useState<string>("");

    // cleanup old blob URLs (if you switch to createObjectURL)
    useEffect(() => {
      return () => {
        if (previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);

    const validteAndPreviwe = (file?: File) => {
      if (!file) return;
      if (!acceptedTypes.includes(file.type) || file.size > maxSizeMB * 1024 * 1024) {
        setError(`File must be ${acceptedTypes.join('/')} and under ${maxSizeMB} MB.`);
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string; // a “data:image/…” string
        setPreviewUrl(url); // local state
        onChange(url); // persistable form data
      };
      reader.readAsDataURL(file);
    };
    
    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => validteAndPreviwe(event.target.files?.[0]);
    const onDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      validteAndPreviwe(event.dataTransfer.files[0]);
    };
    const onDragOver = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

    const remove = () => {
      setPreviewUrl("");
      setError("");
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input value
      onChange(null);
    }
  return {
    fileInputRef,
    previewUrl,
    error,
    handlers: {onFileChange, onDrop, onDragOver, remove},
  }
}