import { FaMedal } from "react-icons/fa";
import StatCard from "../../StatCard";


const StatsBar = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* Total Points */}
      <StatCard
        title="Total Points"
        value="2,450"
        progress={75}
        progressLabel="550 points to next level"
      />

      {/* Leaderboard Rank */}
      <StatCard
        title="Leaderboard Rank"
        value="#12"
        description={<FaMedal size={50} color="gold" className="mx-auto" />}
      />

      {/* People Helped */}
      <StatCard
        title="People Helped"
        value="45"
        progress={90}
        progressLabel={'5 more to "Super Helper" badge'}
      />
    </div>
  );
};

export default StatsBar;