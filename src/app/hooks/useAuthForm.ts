import { useState } from "react";
import axios from 'axios';

import { AuthFields } from "@/types/types";

const useAuthForm = (initialFields: AuthFields, apiUrl: string) => {
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
      const response = await axios.post(apiUrl, formData);
      console.log(response.data);
      window.location.href = 'dashboard';
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
