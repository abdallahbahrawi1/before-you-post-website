"use client";

import { useCallback, useEffect } from "react"
import BasicPostInfo from "@/features/wizard-steps/forth-step/BasicPostInfo";
import ImageUploadStep from "@/features/wizard-steps/second-step/ImageUploadStep";
import ContentTypeCategoriesStep from "@/features/wizard-steps/third-step/ContentTypeCategoriesStep";
import Steps from "@/features/wizard-steps/steps/Steps";

import { RequestFormData } from "@/types/types";
import { useWizard } from "@/features/dashboard/hooks/useWizard";
import { useLocalStorage } from "@/features/dashboard/hooks/useLocalStorage";
import SuccessCard from "@/features/wizard-steps/final-step/SuccessCard";
import { useRouter } from "next/navigation";
import ConfirmAndPostCard from "@/features/wizard-steps/fifth-step/ConfirmAndPostCard";
import { useAuth } from "@/features/auth/AuthContext";

const INITIAL_FORM_DATA: RequestFormData = {
  title: '',
  postContent: '',
  imageUrl: null,
  contentType: 'other',
  otherContentType: '',
  tags: [],
};

const RequestWizard = () => {
  const { currentStep, setCurrentStep, maxStepReached, goNext, reset } = useWizard();
  const { fetchAndSetUser } = useAuth();
  const [formData, setFormData] = useLocalStorage<RequestFormData>("newRequestFormData", INITIAL_FORM_DATA);

  useEffect(() => {
    if (currentStep === 4) {
      // Refresh user points
      void fetchAndSetUser();
      // Clear localStorage for the form
      setFormData(INITIAL_FORM_DATA);
    }
  }, [currentStep, fetchAndSetUser, setFormData]);

  const handleFormDataChange = useCallback((data: RequestFormData) => {
    setFormData(data)
  }, [setFormData])

  /** Simple example: 1 point per tag + 20 base */
  const pointsUsed = 15;
  const router = useRouter();
  const viewRequest = () => router.push(`/dashboard/`);
  const helpOthers = () => router.push(`/vote-feed/`);

  const createAnother = () => {
    // clear form + go back to first step
    setFormData(INITIAL_FORM_DATA);
    reset();            // from your wizard hook (sets currentStep = 0, maxStepReached = 0)
  };

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
        return <ContentTypeCategoriesStep
          initialData={formData}
          onChange={handleFormDataChange}
          onNext={goNext}
        />
      case 3:
        return <ConfirmAndPostCard
          formData={formData}
          pointsUsed={pointsUsed}
          onNext={goNext}
          onBack={() => setCurrentStep(2)}
          onEarn={() => router.push("/dashboard/post-feed")}
        />
      case 4:
        return <SuccessCard
          data={formData}
          pointsUsed={pointsUsed}
          onViewRequest={viewRequest}
          onCreateAnother={createAnother}
          onHelpOthers={helpOthers}
        />
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