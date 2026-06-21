import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() =>
  import('./pages/Home').then(m => ({ default: m.Home }))
);
const OffGridIceRig = lazy(() =>
  import('./pages/OffGridIceRig').then(m => ({ default: m.OffGridIceRig }))
);

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/off-grid-ice-rig" element={<OffGridIceRig />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
