import { useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Layout main>
      <div className="flex flex-col pb-4">
        <button onClick={() => navigate('/map')}>지도 페이지</button>
        <button onClick={() => navigate('/login')}>로그인 페이지</button>
        <button onClick={() => navigate('/room/upload')}>
          매물 등록 페이지
        </button>
      </div>
    </Layout>
  );
};

export default MainPage;
