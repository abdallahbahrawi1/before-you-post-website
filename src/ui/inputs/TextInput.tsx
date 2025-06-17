
interface TextInputProps {
  label: string;
  type: string;
  placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, type, placeholder }) => (
  <div className="mb-6">
    <label className="block mb-2 font-semibold text-blue-900">{label}</label>
    <input
      type={type}
      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
