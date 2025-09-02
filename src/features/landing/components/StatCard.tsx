

import StatHeader from "./statistics/StatCard/StatHeader";
import StatDescription from "./statistics/StatCard/StatDescription";
import ProgressBar from "@/ui/data-display/ProgressBar";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: React.ReactNode;
  progress?: number;
  progressLabel?: string;
  progressColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description = null,
  progress = 0,
  progressLabel = '',
  className = '',
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md text-center ${className}`}>
      <StatHeader title={title} value={value} />
      {progress !== 0 && <ProgressBar value={progress} />}
      {progressLabel && <small className="text-gray-500">{progressLabel}</small>}
      <StatDescription description={description} />
    </div>
  );
};

export default StatCard;
