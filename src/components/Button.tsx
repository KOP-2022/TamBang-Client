import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { cls } from '@/libs/utils';

const Button = ({
  children,
  className,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <button
    {...rest}
    className={cls(
      'rounded-lg text-white bg-primary px-2 py-2 shadow-md disabled:shadow-none disabled:text-grey hover:bg-primary-light transition-all focus:outline focus:-outline-offset-2 focus:outline-2 focus:outline-primary-dark disabled:bg-primary-lighter disabled:cursor-not-allowed',
      className || ''
    )}
  >
    {children}
  </button>
);

export default Button;
