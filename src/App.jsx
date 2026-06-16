import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { OffGridIceRig } from './pages/OffGridIceRig';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/off-grid-ice-rig" element={<OffGridIceRig />} />
    </Routes>
  );
}

export default App;
