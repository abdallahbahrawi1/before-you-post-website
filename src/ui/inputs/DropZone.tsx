import { ReactNode, DragEvent, RefObject, ChangeEvent } from 'react';


interface DropZoneProps {
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  children: ReactNode;
}
const DropZone: React.FC<DropZoneProps> = ({ 
  fileInputRef, 
  onFileChange, 
  onDrop, 
  onDragOver, 
  children 
}) => (
  <div
    className="border-2 border-dashed border-purple-600 rounded-lg p-12 text-center cursor-pointer transition-colors duration-300 bg-purple-50 mb-6 hover:border-coral hover:bg-purple-100"
    onClick={() => fileInputRef.current?.click()}
    onDrop={onDrop}
    onDragOver={onDragOver}
  >
    {children}
    <input
      type="file"
      ref={fileInputRef}
      accept="image/jpeg,image/png"
      onChange={onFileChange}
      className="hidden"
    />
  </div>
);

export default DropZone;