'use client';

import useAuthForm from "@/app/hooks/useAuthForm";
import Checkbox from "../common/Checkbox";
import FormGroup from "../common/FormGroup";
import SubmitButton from "../common/SubmitButton";
import { AuthFields } from "@/types/types";


const SignUpForm = () => {
  const initialFields: AuthFields = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  };

  const { formData, handleChange, handleSubmit, error, loading } = useAuthForm(initialFields, 'http://localhost:5000/auth/signup');

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="First Name"
        type="text"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
        placeholder="Enter your first name"
      />
      <FormGroup
        label="Last Name"
        type="text"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
        placeholder="Enter your last name"
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
      <FormGroup
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword || ''}
        onChange={handleChange}
        placeholder="Confirm your password"
      />
      <Checkbox checked={formData.termsAccepted ?? false} onChange={handleChange} />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <SubmitButton loading={loading} label="Create Account" />
    </form>
  );
};

export default SignUpForm;