interface ProgressBarProps {
  value: number;
  color?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'bg-purple-500',
  className = "",
}) => {
  const clampedProgress = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
