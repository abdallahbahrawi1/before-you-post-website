// src/hooks/useBasicPostInfoForm.ts
import { useState, useEffect } from "react";
import * as yup from "yup";
import { RequestFormData } from "@/types/types";

const schema = yup.object({
  title:   yup.string().trim().required("Title is required"),
  content: yup.string().trim().required("Content is required"),
});

type Fields = { title: string; content: string };
type Errors = Partial<Record<keyof Fields, string>>;

export function useBasicPostInfoForm(
  initialData: RequestFormData,
  onChange: (data: RequestFormData) => void
) {
  const [values, setValues] = useState<Fields>({
    title:   initialData.title   || "",
    content: initialData.content || "",
  });
  const [errors, setErrors] = useState<Errors>({});

  // propagate up on every field change
  useEffect(() => {
    onChange({ ...values, image: initialData.image ?? null });
  }, [values, onChange, initialData.image]);

  const handleChange =
    (field: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues(v => ({ ...v, [field]: e.target.value }));
    };

  // returns true if valid, populates `errors` otherwise
  const validate = (): boolean => {
    try {
      schema.validateSync(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errs: Errors = {};
      (err as yup.ValidationError).inner.forEach((e: yup.ValidationError) => {
        if (e.path) errs[e.path as keyof Fields] = e.message;
      });
      setErrors(errs);
      return false;
    }
  };

  return { values, errors, handleChange, validate };
}
