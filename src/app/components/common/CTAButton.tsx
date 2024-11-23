interface CTAButtonProps {
  children: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children }) => {
  return (
    <button className="relative px-12 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-purple to-coral shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl overflow-hidden">
      {children}
    </button>
  );
};

export default CTAButton;
