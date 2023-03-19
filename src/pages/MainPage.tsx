import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '@/components/Layout';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Layout main>
      <img src="/home-banner.jpg" alt="" className="object-cover w-full h-80" />
      <div className="grid grid-cols-2 gap-8 px-16 w-full -mt-14">
        <button
          className="rounded-md border border-transparent bg-white p-4 hover:border-primary transition-colors shadow-md"
          onClick={() => navigate('/map')}
        >
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon
              icon={['fas', 'map']}
              size="3x"
              className="text-primary"
            />
            <span className="font-bold">지도</span>
          </div>
        </button>
        <button
          className="rounded-md border border-transparent bg-white hover:border-primary p-4 transition-colors shadow-md"
          onClick={() => navigate('/room/upload')}
        >
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon
              icon={['fas', 'house-circle-check']}
              size="3x"
              className="text-primary"
            />
            <span className="font-bold">집 내놓기</span>
          </div>
        </button>
      </div>
    </Layout>
  );
};

export default MainPage;
