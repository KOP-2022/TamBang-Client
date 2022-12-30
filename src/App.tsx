import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import MapPage from './pages/MapPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/map" element={<MapPage />}></Route>
    </Routes>
  );
};

export default App;
