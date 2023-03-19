import { UseFormRegisterReturn } from 'react-hook-form';

import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';
import Input from './Input';

interface SearchBarProps {
  register: UseFormRegisterReturn;
}

const SearchBar = ({ register }: SearchBarProps) => {
  return (
    <div className="flex justify-center w-full gap-4">
      <Input
        type="text"
        icon={faLocationDot}
        placeholder="주소를 입력하세요."
        register={register}
      />
      <Button>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xl"
          className="text-currentColor"
        />
      </Button>
    </div>
  );
};

export default SearchBar;
