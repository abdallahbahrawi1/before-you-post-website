import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

interface SocialButtonProps {
  platform: string;
}

const SocialButton = ({ platform }: SocialButtonProps) => {
  const icon = platform === "Google" ? <AiOutlineGoogle size={20} /> : <FaFacebookF size={20} />;
  const color = platform === "Google" ? "#1B2D45" : "#1B2D45";

  return (
    <button className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100">
      <span className="m-1" style={{ color }}>{icon}</span>
      <span>{platform}</span>
    </button>
  );
};

export default SocialButton;
