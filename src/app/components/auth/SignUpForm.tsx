'use client';

import useAuthForm from "@/app/hooks/useAuthForm";
import Checkbox from "../common/Checkbox";
import FormGroup from "../common/FormGroup";
import SubmitButton from "../common/SubmitButton";
import { AuthFields } from "@/types/types";


const SignUpForm = () => {
  const initialFields: AuthFields = {
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false,
  };

  const { formData, handleChange, handleSubmit, error, loading } = useAuthForm(initialFields, 'http://localhost:5000/auth/signup');

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

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <SubmitButton loading={loading} label="Create Account" />
    </form>
  );
};

export default SignUpForm;