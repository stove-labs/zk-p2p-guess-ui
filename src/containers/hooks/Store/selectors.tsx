import { shuffle } from 'lodash';
import { useMemo } from 'react';
import { useStore, useStoreContext } from './useStore';

// select the current challenge
export const useSelectChallenge = () => {
  const [state] = useStoreContext();

  return useMemo(() => state.challenge, [state.challenge]);
};

// select the current cats and the cat status
export const useSelectCats = () => {
  const [state] = useStoreContext();

  return useMemo(
    () => ({
      data: state.cats.data,
      status: state.cats.status,
    }),
    [state]
  );
};

// select the current cats, but shuffle them (useful to randomise the order again after fetching 'all cats')
export const useSelectCatsShuffled = () => {
  const cats = useSelectCats();
  return {
    ...cats,
    data: shuffle(cats.data),
  };
};

// select the currently selected cat
export const useSelectSelectedCat = () => {
  const secret = useSelectSecret();
  const cats = useSelectCats();
  // find a cat from all cats that matches our challenge secret
  return useMemo(() => {
    return cats.data?.find((cat) => cat.id === secret);
  }, [cats]);
};

// select the current secret from the current challenge
export const useSelectSecret = () => {
  const challenge = useSelectChallenge();
  return useMemo(() => challenge?.secret, [challenge?.secret]);
};

// select the p2p state
export const useSelectP2P = () => {
  const [state] = useStoreContext();
  return state.p2p;
};

// select the peerId from the p2p state
export const useSelectPeerId = () => {
  const p2p = useSelectP2P();
  return useMemo(() => p2p?.peerId, [p2p]);
};

export const useSelectGuessStatus = () => {
  const [state] = useStoreContext();
  return useMemo(() => state.guess.status, [state]);
};
