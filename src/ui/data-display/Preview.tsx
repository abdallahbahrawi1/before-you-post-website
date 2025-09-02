
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

interface PreviewProps {
  src: string;
  onRemove: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ src, onRemove }) => (
  <>
    <Image
      src={src}
      alt="Preview"
      width={600}
      height={240}
      className="w-full max-h-60 rounded-lg object-contain transition-opacity duration-500 ease-in-out"
      style={{ width: '100%', height: 'auto' }}
    />
    <button
      type="button"
      className="flex items-center gap-2 text-coral font-semibold transition-colors duration-300 hover:text-red-500"
      onClick={onRemove}
    >
      <AiOutlineClose size={20} /> Remove
    </button>
  </>
);
