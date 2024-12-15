import HelpFilters from "../components/StatCard/HelpFilters";
import StatsBar from "../components/StatCard/StatsBar";
import RequestGrid from "../components/RequestGrid/RequestGrid";
import RequestHero from "../components/RequestGrid/RequestHero";

const Support = () => {
  return (
    <div className="container mx-auto py-28 p-6 space-y-6">
      <RequestHero />
      <StatsBar />
      <HelpFilters />
      <RequestGrid />
    </div>
  );
};

export default Support;
