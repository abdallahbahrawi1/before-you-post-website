import { useState, useCallback } from "react";

export function useWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      setMaxStepReached((prev) => Math.max(prev, next));
      return next;
    });
  }, []);

  const reset = useCallback(() => { setCurrentStep(0); setMaxStepReached(0); }, []);

  return { currentStep, setCurrentStep, maxStepReached, goNext, reset };

}