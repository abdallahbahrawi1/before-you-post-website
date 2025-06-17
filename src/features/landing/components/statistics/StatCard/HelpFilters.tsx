const HelpFilters = () => {
  return (
    <section className="mx-auto my-8 px-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search help requests..."
          className="w-full p-4 border-2 border-purple-100 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>
      <div className="flex gap-4">
        <select className="p-3 border-2 border-purple-100 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300">
          <option>All Categories</option>
          <option>LinkedIn</option>
          <option>Resume</option>
          <option>Portfolio</option>
        </select>
        <select className="p-3 border-2 border-purple-100 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300">
          <option>Points: Any</option>
          <option>10-50 points</option>
          <option>50-100 points</option>
          <option>100+ points</option>
        </select>
        <select className="p-3 border-2 border-purple-100 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300">
          <option>Most Recent</option>
          <option>Expiring Soon</option>
          <option>Most Points</option>
        </select>
      </div>
    </section>
  );
};

export default HelpFilters;
