import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomePage as HomePageComponent } from './../components/HomePage/HomePage';
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleGameStart = useCallback(() => {
    navigate('/challenge');
  }, []);

  return <HomePageComponent onGameStart={handleGameStart} />;
};
