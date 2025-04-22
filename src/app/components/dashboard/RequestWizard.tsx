import { useState } from "react"
import BasicPostInfo from "../wizard-steps/BasicPostInfo"
// import Steps from "../wizard-steps/Steps"
// import { useRouter } from "next/navigation" consider using this for navigation

const RequestWizard = () => {
  const [steps, setSteps] = useState(1);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    image: File | null;
  }>({
    title: "",
    content: "",
    image: null,
  })

  const goNext = () => setSteps(prev => prev + 1);
  const goBack = () => setSteps(prev => Math.max(prev - 1, 1));


  switch (steps) {
    case 1:
      return (
        <>
          {/* <Steps /> */}
          <BasicPostInfo 
            initialData={formData}
            onChange={(data) => setFormData(data)}
            onNext={() => setSteps(2)}
          />
        </>
      )
    default:
      return (
        <div className="text-center text-2xl font-semibold">
          Step {steps} not found
        </div>
      )
  }

}

export default RequestWizard