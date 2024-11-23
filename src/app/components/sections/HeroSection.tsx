import HeroContent from './HeroContent';
import FloatingCards from '../ui/FloatingCards';

const HeroSection: React.FC = () => {
  return (
    <section className="hero min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:px-20 relative bg-light text-deep-blue overflow-hidden">
      <div className="absolute right-[-20%] top-[-20%] w-[60%] h-[60%] bg-mint opacity-10 rounded-full blur-[80px] animate-pulse"></div>
      <HeroContent />
      <FloatingCards />
    </section>
  );
};

export default HeroSection;
