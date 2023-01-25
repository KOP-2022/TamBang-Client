import Input from './Input';

import type { InputProps } from './Input';

interface FormInputProps extends InputProps {
  label: string;
}

const FormInput = ({ label, type, placeholder, register }: FormInputProps) => {
  return (
    <div>
      <label>{label}</label>
      <Input type={type} placeholder={placeholder} register={register} />
    </div>
  );
};

export default FormInput;
