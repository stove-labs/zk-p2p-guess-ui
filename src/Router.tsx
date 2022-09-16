import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
