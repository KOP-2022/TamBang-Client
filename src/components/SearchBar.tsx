import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';
import Input from './Input';

const SearchBar = () => {
  return (
    <div className="flex justify-center w-full gap-4">
      <Input
        type="text"
        icon={['fas', 'location-dot']}
        placeholder="주소를 입력하세요."
      />
      <Button>
        <FontAwesomeIcon
          icon={['fas', 'magnifying-glass']}
          size="xl"
          className="text-currentColor"
        />
      </Button>
    </div>
  );
};

export default SearchBar;
