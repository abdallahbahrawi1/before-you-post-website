const PointsSelector = () => (
  <div className="form-group">
    <label className="block font-semibold mb-2 text-gray-700">Points to Allocate</label>
    <div className="relative">
      <select
        className="w-full p-3 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition appearance-none"
      >
        <option>25 points</option>
        <option>50 points</option>
        <option>75 points</option>
        <option>100 points</option>
      </select>
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
        ▼
      </span>
    </div>
  </div>
);

export default PointsSelector;