'use client';

import useAuthForm from "@/hooks/useAuthForm";
import { AuthFields } from "@/types/types";
import { Button } from "@/ui/inputs/Button";
import Checkbox from "@/ui/inputs/Checkbox";
import FormGroup from "@/ui/layout/FormGroup";


const SignUpForm = () => {
  const initialFields: AuthFields = {
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false,
  };

  const { formData, handleChange, handleSubmit, error, loading } = useAuthForm(
    initialFields, 
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName || ''}
        onChange={handleChange}
        placeholder="Enter your full name"
      />
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
        placeholder="Create a password"
      />
      <Checkbox
        name="termsAccepted"
        checked={formData.termsAccepted ?? false}
        onChange={handleChange}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="text-sm">{error}</p>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Button loading={loading}>Create Account</Button>
    </form>
  );
};

export default SignUpForm;