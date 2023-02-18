import { UseFormRegisterReturn } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CheckBoxProps {
  children: string;
  register: UseFormRegisterReturn;
}

const CheckBox = ({ children, register }: CheckBoxProps) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id={children}
        className="hidden"
        {...register}
        value={children}
      />
      <label htmlFor={children}>
        <FontAwesomeIcon
          icon={['fas', 'check']}
          size="sm"
          className="text-currentColor"
        />
      </label>
      <label htmlFor={children} className="cursor-pointer">
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
