
import { AiOutlineClose } from 'react-icons/ai';

interface PreviewProps {
  src: string;
  onRemove: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ src, onRemove }) => (
  <div className="flex flex-col items-center gap-4">
    <img
      src={src}
      alt="Preview"
      className="w-full max-h-60 rounded-lg object-contain transition-opacity duration-500 ease-in-out"
    />
    <button
      type="button"
      className="flex items-center gap-2 text-coral font-semibold transition-colors duration-300 hover:text-red-500"
      onClick={onRemove}
    >
      <AiOutlineClose size={20} /> Remove
    </button>
  </div>
);
