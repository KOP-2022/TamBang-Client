import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cls } from '../libs/utils';

interface InputProps {
  placeholder?: string;
  icon?: IconProp;
}

const Input = ({ icon, placeholder }: InputProps) => (
  <div className="flex items-center w-full">
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        size="xl"
        className="text-grey absolute ml-4"
      />
    )}
    <input
      type="text"
      className={cls(
        'border pr-4 border-grey2 bg-transparent rounded-lg shadow-md w-full h-10 outline-none transition-colors focus:border-primary-dark',
        icon ? 'pl-12' : 'pl-4'
      )}
      placeholder={placeholder}
    />
  </div>
);

export default Input;
