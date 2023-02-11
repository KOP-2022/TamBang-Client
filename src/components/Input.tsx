import type { UseFormRegisterReturn } from 'react-hook-form';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cls } from '@/libs/utils';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: IconProp;
  register?: UseFormRegisterReturn;
}

const Input = ({
  icon,
  placeholder,
  register,
  type,
  className,
  ...rest
}: InputProps) => (
  <div className="flex items-center w-full">
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        size="xl"
        className="text-grey absolute ml-4"
      />
    )}
    <input
      type={type}
      className={cls(
        'pr-4 h-10 form-input',
        icon ? 'pl-12' : 'pl-4',
        className ?? ''
      )}
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  </div>
);

export default Input;
