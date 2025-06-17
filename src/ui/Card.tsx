import { ReactNode, memo } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}
const Card = memo(({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white shadow-md rounded-md p-4 border border-gray-200 ${className}`}
  >
    {children}
  </div>
));

Card.displayName = "Card";

export default Card;