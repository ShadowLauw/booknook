import { useState } from "react";
import { ZodType } from "zod";

type FormValues = Record<string, string>;

export function useAuthForm<T extends FormValues>(
  schema: ZodType<T>,
  initialValues: T
) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = <K extends keyof T>(field: K, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (): boolean => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Partial<Record<keyof T, string>> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0] as keyof T] = i.message;
      });
      setErrors(errs);
      return false;
    }
    return true;
  };

  return { form, errors, handleChange, handleSubmit, setForm, setErrors };
}
