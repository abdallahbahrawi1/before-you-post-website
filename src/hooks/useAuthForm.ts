import { useState } from "react";
import { AuthFields } from "@/types/types";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";

const useAuthForm = (initialFields: AuthFields, apiUrl: string) => {
  const router = useRouter();
  const { loginOrRegister } = useAuth();
  const [formData, setFormData] = useState(initialFields);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      loginOrRegister(formData, apiUrl);


      router.push('/dashboard');
      // window.location.href = 'dashboard';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = ""
      if(error.response){
        errorMessage = error.response?.data?.error || "An error occurred. Please try again."
      }else{
        errorMessage = error;
      }
      console.error(errorMessage);
      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, loading };
};

export default useAuthForm;
