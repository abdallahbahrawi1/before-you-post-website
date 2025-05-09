"use client";

import { useCallback } from "react"
import BasicPostInfo from "../wizard-steps/BasicPostInfo"
import Steps from "../wizard-steps/Steps";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { RequestFormData } from "@/types/types";
import { useWizard } from "@/app/hooks/useWizard";
import ImageUploadStep from "../wizard-steps/ImageUploadStep";
import ContentTypeCategoriesStep from "../wizard-steps/ContentTypeStep/ContentTypeCategoriesStep";

const INITIAL_FORM_DATA = {
  title: "",
  content: "",
  image: null,
 }


const RequestWizard = () => {
  const {currentStep, setCurrentStep, maxStepReached, goNext} = useWizard();

  const [formData, setFormData] = useLocalStorage<RequestFormData>("newRequestFormData", INITIAL_FORM_DATA);

  const handleFormDataChange = useCallback((data: RequestFormData) => {
    setFormData(data)
  }, [setFormData])

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <BasicPostInfo
          initialData={formData}
          onChange={handleFormDataChange}
          onNext={goNext}
        />;
      case 1:
        return <ImageUploadStep
          initialData={formData}
          onChange={handleFormDataChange}
          onNext={goNext}
        />
      case 2:
        return <ContentTypeCategoriesStep />
      // Add other steps here
      default:
        return <div className="text-center text-xl">Step Not Found!{currentStep}</div>;
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