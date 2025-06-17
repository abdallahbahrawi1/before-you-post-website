import { ReactNode } from 'react';

interface ContentTypeOptionProps {
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: ReactNode;
  label: string;
}

export const ContentTypeOption: React.FC<ContentTypeOptionProps> = ({
  value,
  checked,
  onChange,
  icon,
  label,
}) => (
  <label className="block">
    <input
      type="radio"
      name="contentType"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center gap-2 min-h-[80px] cursor-pointer transition peer-checked:border-blue-400 peer-checked:bg-blue-50 peer-checked:shadow peer-checked:shadow-blue-200 bg-white">
      {icon}
      <span className="text-sm font-medium transition peer-checked:text-blue-800">
        {label}
      </span>
    </div>
  </label>
);
