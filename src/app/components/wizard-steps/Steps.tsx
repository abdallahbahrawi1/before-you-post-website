
const steps = [
   "Basic Post Info",
   "Add Image",
   "Review & Submit",
   "Success",
   "Error"
]

const Steps = ({ currentStepIndex = 0, maxStepReached, onStepClick }: {currentStepIndex: number; maxStepReached: number;  onStepClick: (index:number) => void}) => {
  return (
    <div className="tabs flex gap-4 mb-8 border-b-2 ">
      {steps.map((label, index) => {
        const isActive = index === currentStepIndex;
        const isCompleted = index <= maxStepReached;

        return (
        <button
          onClick={() => {
            if (isCompleted) onStepClick(index);
          }}
          key={label}
          disabled={!isCompleted}
          className={`tab-btn px-4 py-2 font-semibold border-b-2 
          ${isActive ? "border-purple-500 text-blue-900"
              : !isCompleted ? "border-transparent text-gray-600 cursor-not-allowed"
              : "border-transparent text-gray-600 hover:text-blue-700 hover:border-blue-700"} 
          transition-opacity focus:outline-none`}>
            {label}
        </button>
        );
      })}
    </div>
  )
}


export default Steps