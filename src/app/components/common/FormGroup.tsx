import React from 'react';

interface FormGroupProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="form-group mb-6">
    <label className="form-label block mb-2 font-semibold text-blue-900">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
      required
    />
  </div>
);

export default FormGroup;