import Input from './Input';

import type { InputProps } from './Input';

interface FormInputProps extends InputProps {
  label: string;
}

const FormInput = ({
  label,
  type,
  placeholder,
  register,
  ...rest
}: FormInputProps) => {
  return (
    <div>
      <label>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        register={register}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
