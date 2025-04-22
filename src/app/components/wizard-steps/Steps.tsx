
const steps = [
  { label: "Basic Post Info", status: "active" },
  { label: "Add Image", status: "inactive" },
  { label: "Review & Submit", status: "inactive" },
  { label: "Success", status: "inactive" },
  { label: "Error", status: "inactive" },
]

const Steps = ({ currentStepIndex = 0, onStepClick }) => {
  return (
    <div className="tabs flex gap-4 mb-8 border-b-2 ">

      {steps.map((step, index) => (
        <div
          key={step.label}
          className={`step tab-btn px-4 py-2 font-semibold border-b-2 
          ${step.status === "active"
              ? "border-purple-500 text-blue-900"
              : "border-transparent text-gray-600"} 
          transition-opacity hover:text-blue-700 hover:border-blue-700 focus:outline-none`}>
          <div className="step-label">
            {step.label}
          </div>
          {index < steps.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  )
}


export default Steps