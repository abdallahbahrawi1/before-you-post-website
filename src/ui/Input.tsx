interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  label?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  label,
  required = false,
}) => {
  const inputClass = `w-full p-3 border ${type === "file" ? "border-dashed" : "border-solid"
    } border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none`;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="block font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClass}`}
          rows={4}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClass}`}
        />
      )}
    </div>
  );
};

export default Input;
