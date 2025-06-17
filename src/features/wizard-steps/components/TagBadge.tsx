import { FaRegFileAlt } from 'react-icons/fa';

interface TagBadgeProps {
  tag: string;
  onRemove: (tag: string) => void;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, onRemove }) => (
  <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 flex items-center gap-1 text-sm">
    {tag}
    <FaRegFileAlt onClick={() => onRemove(tag)} className="cursor-pointer hover:text-gray-800" />
  </span>
);
