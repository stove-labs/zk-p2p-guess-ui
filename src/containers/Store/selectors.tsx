import { useMemo } from 'react';
import { useStoreContext } from './useStore';

export const useChallenge = () => {
  const [state] = useStoreContext();

  return useMemo(() => state.challenge, [state.challenge]);
};

export const useCats = () => {
  const challenge = useChallenge();

  return useMemo(
    () => ({
      data: challenge.cats.data,
      status: challenge.cats.status,
    }),
    [challenge]
  );
};

export const useSecret = () => {
  const challenge = useChallenge();
  return useMemo(() => challenge.secret, [challenge.secret]);
};

export const usePeerId = () => {
  const [state] = useStoreContext();
  return state.p2p.peerId;
};
