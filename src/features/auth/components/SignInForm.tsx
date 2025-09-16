'use client';

import { AuthFields } from "@/types/types";
import useAuthForm from "@/hooks/useAuthForm";
import FormGroup from "@/ui/layout/FormGroup";
import { Button } from "@/ui/inputs/Button";

const SignInForm = () => {
  const initialFields: AuthFields = {
    email: '',
    password: '',
  };

  const { formData, handleChange, handleSubmit, error, loading } = useAuthForm(initialFields, 'http://localhost:5000/auth/login');


  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <FormGroup
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Button type="submit" loading={loading}>Sign In</Button>
    </form>
  );
};

export default SignInForm;