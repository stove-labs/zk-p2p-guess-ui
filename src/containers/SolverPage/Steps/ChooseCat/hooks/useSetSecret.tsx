import { useCallback } from 'react';
import { useStoreContext } from '../../../../hooks/Store/useStore';

export const useSetSecret = () => {
  const [state, dispatch] = useStoreContext();
  return useCallback((secret: string) => {
    dispatch({ type: 'SET_SECRET', payload: { secret } });
  }, []);
};
