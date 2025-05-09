import { useFadeIn } from '@/app/hooks/useFadeIn';

export const AnimatedCard: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const isVisible = useFadeIn();
  return (
    <div
      className={
        `bg-white p-12 rounded-2xl shadow-lg w-full max-w-lg transform transition-all duration-500 ease-out ` +
        (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5')
      }
    >
      {children}
    </div>
  );
};