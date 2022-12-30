import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/map')}>Go to map page.</button>
    </>
  );
};

export default MainPage;
