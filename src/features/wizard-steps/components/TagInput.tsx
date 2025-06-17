interface TagInputProps {
  value: string;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ value, onChange, onKeyDown, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
  />
);
