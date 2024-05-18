import { Route, Routes } from 'react-router-dom';
import Misha from '../../pages/Misha/Misha';
import Karen from '../../pages/Karen/Karen';
import Maks from '../../pages/Maks/Maks';
import Table from '../../pages/Table/Table';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="misha" element={<Misha/>} />
      <Route path="karen" element={<Karen/>} />
      <Route path='maks' element={<Maks/>} />
      <Route path='table' element={<Table/>} />
    </Routes>
  );
};

export default MainRouter;
