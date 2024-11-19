import { useState } from "react";

export const useInputChange = <T extends Record<string, any>>(
  defaultValues: T
) => {
  const [values, setValues] = useState<T>(defaultValues);

  const handler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const reset = () => {
    setValues(defaultValues);
  };

  const setValueInit = (value: any) => {
    setValues(value);
  };

  return { setValues, values, handler, setValueInit, reset };
};
