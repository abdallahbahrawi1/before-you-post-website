
interface ActionsProps {
  canNext: boolean;
  onNext: () => void;
  onSkip: () => void;
}

export const Actions: React.FC<ActionsProps> = ({ canNext, onNext, onSkip }) => (
  <div className="flex flex-col items-center gap-4">
    <button
      onClick={onNext}
      disabled={!canNext}
      className="w-full py-4 rounded-lg bg-gradient-to-br from-purple-600 to-coral text-white font-semibold transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
    <button onClick={onSkip} className="text-purple-600 font-semibold hover:underline">
      Skip this step
    </button>
  </div>
);
