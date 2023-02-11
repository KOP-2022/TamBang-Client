import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
  back?: boolean;
  title?: string;
  main?: boolean;
}

const Header = ({ back, title }: HeaderProps) => {
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate(-1);
  };
  const onHomeClick = () => {
    navigate('/');
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
              <FontAwesomeIcon icon={['fas', 'chevron-left']} size="xl" />
            ) : (
              <span className="select-none font-bold text-primary text-xl">
                TamBang
              </span>
            )}
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title}
        </div>
        <div className="absolute top-0 bottom-0 right-3">
          {back && (
            <button className="h-14 w-12" onClick={onHomeClick}>
              <FontAwesomeIcon icon={['fas', 'house']} size="xl" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
