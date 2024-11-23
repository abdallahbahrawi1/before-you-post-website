const TERMS_URL = 'https://example.com/terms';
const PRIVACY_URL = 'https://example.com/privacy';

import { ChangeEvent } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => (
  <div className="form-group mb-6">
    <label className="checkbox-container flex items-center">
      <input type="checkbox" className="mr-2" checked={checked} onChange={onChange} />
      <span className="checkbox-text text-blue-900">
        I agree to the{' '}
        <a href={TERMS_URL} className="text-purple-500 font-semibold hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href={PRIVACY_URL} className="text-purple-500 font-semibold hover:underline">
          Privacy Policy
        </a>
      </span>
    </label>
  </div>
);
export default Checkbox;