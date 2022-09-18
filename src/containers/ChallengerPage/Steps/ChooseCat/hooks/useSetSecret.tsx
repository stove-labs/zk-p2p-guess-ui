import { useCallback } from 'react';
import { useStoreContext } from '../../../../hooks/Store/useStore';

/**
 * Set the challenge secret
 */
export const useSetSecret = () => {
  const [_, dispatch] = useStoreContext();
  return useCallback(
    (secret: string) => {
      dispatch({ type: 'SET_SECRET', payload: { secret } });
    },
    [dispatch]
  );
};
