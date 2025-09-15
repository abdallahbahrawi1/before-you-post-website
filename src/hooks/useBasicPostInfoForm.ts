// src/hooks/useBasicPostInfoForm.ts
import { useState, useEffect } from "react";
import * as yup from "yup";
import { RequestFormData } from "@/types/types";

const schema = yup.object({
  title:   yup.string().trim().required("Title is required"),
  postContent: yup.string().trim().required("Content is required"),
});

type Fields = { title: string; postContent: string };
type Errors = Partial<Record<keyof Fields, string>>;

export function useBasicPostInfoForm(
  initialData: RequestFormData,
  onChange: (data: RequestFormData) => void
) {
  const [values, setValues] = useState<Fields>({
    title:   initialData.title   || "",
    postContent: initialData.postContent || "",
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    onChange({
      ...initialData,           // keep all fields from initialData
      ...values,                // override title and postContent
      imageUrl: initialData.imageUrl ?? null,
    });
  }, [values, onChange]);

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
