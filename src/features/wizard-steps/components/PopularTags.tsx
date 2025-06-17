interface PopularTagsProps {
  tags: string[];
  onAdd: (tag: string) => void;
}

export const PopularTags: React.FC<PopularTagsProps> = ({ tags, onAdd }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map(tag => (
      <span
        key={tag}
        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-200"
        onClick={() => onAdd(tag)}
      >
        {tag}
      </span>
    ))}
  </div>
);
