import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MapPage from './pages/MapPage';
import RegisterPage from './pages/RegisterPage';
import RoomUploadPage from './pages/RoomUploadPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/map" element={<MapPage />}></Route>
      <Route path="/room/upload" element={<RoomUploadPage />}></Route>
    </Routes>
  );
};

export default App;
