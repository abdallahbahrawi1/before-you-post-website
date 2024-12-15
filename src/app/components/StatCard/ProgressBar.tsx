interface ProgressBarProps {
  progress: number;
  progressColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, progressColor }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="w-full bg-gray-200 rounded-full h-2.5 mt-3"
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`${progressColor} h-2.5 rounded-full`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
