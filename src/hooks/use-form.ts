import { useState } from 'react';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

type TFormValues = Record<string, string>;

type TUseFormReturn<T extends TFormValues> = {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<T>>;
};

export function useForm<T extends TFormValues>(inputValues: T): TUseFormReturn<T> {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return { values, handleChange, setValues };
}
