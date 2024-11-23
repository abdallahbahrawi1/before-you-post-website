
interface FloatingCardProps {
  icon: React.ReactNode;
  text: string;
  position: string;
  delay?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ icon, text, position, delay = '' }) => {
  return (
    <div className={`card absolute bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 animate-float ${position} ${delay}`}>
      <div className="card-icon w-10 h-10 rounded-md flex items-center justify-center bg-opacity-10">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
};

export default FloatingCard;
