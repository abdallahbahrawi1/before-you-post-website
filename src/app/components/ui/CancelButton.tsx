import { FaArrowLeft } from "react-icons/fa"

interface CancelButtonProps {
  onClick: () => void,
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <div className="hover:font-bold transition duration-200 ease-in-out">
      <button
        onClick={onClick}
        className="mb-3 flex items-center  text-orange-500 py-2 px-4"
      >
        <FaArrowLeft className="mr-1" size={15} />
        <span>Cancel</span>
      </button>
    </div>
  )
}

export default CancelButton