import { useCallback } from 'react';
import { Cat } from '../../components/ChallengerPage/Stepper';
import { useStoreContext } from './useStore';

export const useLoadCats = () => {
  const [_, dispatch] = useStoreContext();
  return useCallback(() => {
    dispatch({ type: 'LOAD_CATS' });
  }, [dispatch]);
};

export const useSetSecret = () => {
  const [_, dispatch] = useStoreContext();
  return useCallback(
    (secret: Cat) => {
      dispatch({ type: 'SET_SECRET', payload: { secret } });
    },
    [dispatch]
  );
};

export const useCreatePeer = () => {
  const [_, dispatch] = useStoreContext();
  return useCallback(() => {
    dispatch({ type: 'CREATE_PEER' });
  }, []);
};
