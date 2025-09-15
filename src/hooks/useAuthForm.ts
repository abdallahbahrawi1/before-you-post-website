import { useState } from "react";
import { AuthFields } from "@/types/types";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";

const useAuthForm = (initialFields: AuthFields, apiUrl: string) => {
  const router = useRouter();
  const { loginOrRegister } = useAuth();
  const [formData, setFormData] = useState(initialFields);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing again
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginOrRegister(formData, apiUrl);

      router.push('/dashboard');
    } catch (err) {
      console.error("Authentication error:", err)
      // Handle any errors (network errors, server errors, etc.)
      setError(err instanceof Error ? err.message : 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, loading };
};

export default useAuthForm;
