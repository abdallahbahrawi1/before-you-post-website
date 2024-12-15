import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white shadow-md rounded-md p-4 border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

export default Card;