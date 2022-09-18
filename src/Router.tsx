import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { EffectsProvider } from './containers/Store/effects';
import { StoreProvider } from './containers/Store/useStore';
import { ChallengerPage } from './pages/ChallengerPage';
import { HomePage } from './pages/HomePage';
import { SolverPage } from './pages/SolverPage';
import './containers/Store/useEffects';
import { EffectsProvider } from './containers/Store/useEffects';
import { P2PProvider } from './containers/P2P/useP2P';

export const Router = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <P2PProvider>
          <EffectsProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="challenge" element={<ChallengerPage />} />
              <Route path="challenge/:id" element={<SolverPage />} />
            </Routes>
          </EffectsProvider>
        </P2PProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};
