interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => (
  <div className="points-bar w-52 h-2 bg-purple-100 rounded-sm overflow-hidden">
    <div
      className="points-progress h-full bg-purple-500 rounded-sm transition-all duration-300"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export default ProgressBar;