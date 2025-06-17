interface FormActionsProps {
  onPrev: () => void;
  onSubmit: () => void;
  nextDisabled: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ onPrev, onSubmit, nextDisabled }) => (
  <div className="flex justify-between border-t border-gray-200 pt-6">
    <button
      type="button"
      onClick={onPrev}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      Previous
    </button>
    <button
      type="button"
      onClick={onSubmit}
      disabled={nextDisabled}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Next
    </button>
  </div>
);
