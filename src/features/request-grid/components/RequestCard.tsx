interface RequestCardProps {
  category: string;
  title: string;
  description: string;
  points: number;
  timeLeft: string;
  responses: string;
  bgColor: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ category, title, description, points, timeLeft, responses, bgColor }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer">
      <span
        className={`${bgColor} text-white text-sm font-medium px-3 py-1 rounded-full mb-3 inline-block`}
      >
        {category}
      </span>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-green-600 font-bold points-highlight mb-4">🏆 {points} points</div>
      <div className="flex justify-between text-gray-500 text-sm">
        <span>⏰ {timeLeft}</span>
        <span>💬 {responses}</span>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 mt-4 rounded-md">
        Help Now
      </button>
    </div>
  );
};

export default RequestCard;