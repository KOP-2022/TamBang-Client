import { useNavigate } from 'react-router-dom';

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAtom } from 'jotai';
import Cookies from 'universal-cookie';

import { tokenAtom } from '@/atoms/token';

interface HeaderProps {
  back?: boolean;
  title?: string;
  main?: boolean;
}

const Header = ({ back, title }: HeaderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);

  const onBackClick = () => {
    navigate(-1);
  };
  const onHomeClick = () => {
    navigate('/');
  };
  const onLoginClick = () => {
    navigate('/login');
  };
  const onLogoutClick = () => {
    const cookies = new Cookies();
    cookies.remove('jwt');
    setToken('');
  };
  return (
    <nav className="fixed top-0 left-0 right-0 w-full mx-auto max-w-lg z-20">
      <div className="h-14 bg-white">
        <div className="absolute top-0 bottom-0 left-3">
          <button
            className="h-14 w-12"
            onClick={back ? onBackClick : onHomeClick}
          >
            {back ? (
              <FontAwesomeIcon icon={faChevronLeft} size="xl" />
            ) : (
              <span className="select-none font-bold text-primary text-2xl">
                TamBang
              </span>
            )}
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title}
        </div>
        <div className="absolute top-0 bottom-0 right-3">
          {back ? (
            <button className="h-14 w-12" onClick={onHomeClick}>
              <FontAwesomeIcon icon={faHouse} size="xl" />
            </button>
          ) : token ? (
            <button className="h-14 w-12" onClick={onLogoutClick}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
            </button>
          ) : (
            <button className="h-14 w-12" onClick={onLoginClick}>
              <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
