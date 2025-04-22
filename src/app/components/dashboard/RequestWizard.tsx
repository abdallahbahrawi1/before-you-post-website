import { useCallback, useEffect, useState } from "react"
import BasicPostInfo from "../wizard-steps/BasicPostInfo"
import Steps from "../wizard-steps/Steps";
const RequestWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    image: File | null;
  }>({
    title: "",
    content: "",
    image: null,
  })

  const handleFormDataChange = useCallback((data: { title: string; content: string; image: File | null }) => {
    setFormData(data)
  }, [])

  useEffect(() => {
    const savedData = localStorage.getItem("newRequestFormData");
    if(savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("newRequestFormData", JSON.stringify(formData));
  }, [formData])

  const goNext = () => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      setMaxStepReached((prev) => Math.max(prev, next));
      return next;
    });
  }

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <BasicPostInfo 
          initialData={formData}
          onChange={handleFormDataChange}
          onNext={goNext}
        />;
        // case 1:
        // return <AddImage onNext={goNext} />;
      // Add other steps here
      default:
        return <div className="text-center text-xl">Step Not Found!</div>;
    }
  }

  return (
    <>
      <Steps 
        currentStepIndex={currentStep}
        maxStepReached={maxStepReached}
        onStepClick={(stepIndex: number) => {
          if (stepIndex <= maxStepReached) setCurrentStep(stepIndex);
         }}
        />
        {renderStepComponent()}
    </>
  )
}

export default RequestWizard