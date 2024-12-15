import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
}

export const Button = ({ children, variant }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded-md ${
      variant === "primary"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700"
    }`}
  >
    {children}
  </button>
);
