import { Button } from '@/ui/inputs/Button';

const HeroContent: React.FC = () => {
  return (
    <div className="content flex flex-col justify-center p-8 z-10">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple to-coral bg-clip-text text-transparent">
        Get Support, Give Support, Grow Together
      </h1>
      <p className="subtitle text-xl opacity-80 mb-12">
        Earn points for helping others and use them to boost your own content. Join our community of creators supporting creators.
      </p>
      <div className="cta-group flex justify-center">
        <Button variant="cta">Get Support & Grow</Button>
      </div>
    </div>
  );
};

export default HeroContent;
