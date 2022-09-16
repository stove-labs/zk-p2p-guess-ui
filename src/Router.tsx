import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChallengerPage } from './pages/ChallengerPage';
import { HomePage } from './pages/HomePage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="challenge" element={<ChallengerPage />} />
      </Routes>
    </BrowserRouter>
  );
};
