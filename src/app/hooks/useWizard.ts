import { useState, useCallback } from "react";

export function useWizard(){
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      setMaxStepReached((prev) => Math.max(prev, next));
      return next;
    });
  }, []);

  return { currentStep, setCurrentStep, maxStepReached, goNext };

}