import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useAtomValue, useSetAtom } from 'jotai';
import Cookies from 'universal-cookie';

import { tokenAtom } from './atoms/token';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MapPage from './pages/MapPage';
import RegisterPage from './pages/RegisterPage';

const RoomUploadPage = lazy(() => import('./pages/RoomUploadPage'));

const AuthRoute = () => {
  const token = useAtomValue(tokenAtom);
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
};
const PrivateRoute = () => {
  const token = useAtomValue(tokenAtom);
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const App = () => {
  const setToken = useSetAtom(tokenAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    if (jwt) setToken(jwt);
    setLoading(false);
  }, [setToken]);

  return !loading ? (
    <Suspense
      fallback={
        <Layout>
          <div>loading...</div>
        </Layout>
      }
    >
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/room/upload" element={<RoomUploadPage />}></Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
      </Routes>
    </Suspense>
  ) : null;
};

export default App;
