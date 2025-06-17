import ProgressBar from "@/ui/data-display/ProgressBar";

const PointsTracker = () => (
  <div className="points-tracker bg-white p-6 rounded-xl shadow-md flex justify-between items-center mb-8">
    <div>
      <h3 className="text-lg font-semibold mb-2">Points Balance</h3>
      <ProgressBar value={60} />
      <p className="mt-2 text-sm text-gray-600">250 points available</p>
    </div>
    <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition">
      Earn More Points
    </button>
  </div>
);

export default PointsTracker;