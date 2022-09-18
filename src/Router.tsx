import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { EffectsProvider } from './containers/Store/effects';
import { StoreProvider } from './containers/hooks/Store/useStore';
import { ChallengerPage } from './pages/ChallengerPage';
import { HomePage } from './pages/HomePage';
import { SolverPage } from './pages/SolverPage';
import { P2PProvider } from './containers/hooks/useP2P';

export const Router = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <P2PProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="challenge" element={<ChallengerPage />} />
            <Route path="challenge/:peerId" element={<SolverPage />} />
          </Routes>
        </P2PProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};
