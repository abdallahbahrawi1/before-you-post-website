'use client'
import { useFadeIn } from '@/hooks/useFadeIn';
import { ReactNode } from 'react';
import Card from '../Card';


type FloatPos = 'top-0 left-0' | 'top-0 right-0' | 'bottom-0 left-0' | 'bottom-0 right-0' | string;

interface AnimatedCardProps {
  icon?: ReactNode;
  text?: string;
  position?: FloatPos;
  delay?: string;
  children?: ReactNode;
  className?: string
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  icon,
  text,
  position,
  delay = '',
  className = '',
  children,
}) => {
  const visible = useFadeIn();

  // --- animated states ---
  const fade = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';
  const float = position ? `absolute ${position} animate-float ${delay}` : '';
  return (
    <Card
      className={`${fade} transition-all duration-500 ease-out ${float} ${className}`}
    >
      {(icon || text) && (
        <div className="flex items-center gap-4 mb-4 last:mb-0">
          {icon && (
            <div className='w-10 h-10 rounded-md flex items-center justify-center bg-opacity-10'>
              {icon}
            </div>
          )}
          {text && <span>{text}</span>}
        </div>
      )}
      {children}
    </Card>
  );
};

export default AnimatedCard