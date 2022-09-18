import { useCallback, useEffect } from 'react';
import { GuessStatus } from './Store/reducer';
import { useStoreContext } from './Store/useStore';
import { useP2PContext } from './useP2P';

export const useSyncGuessStatus = () => {
  const [state, dispatch] = useStoreContext();
  const p2p = useP2PContext();

  useEffect(() => {
    p2p.receiveGuessStatusUpdates((guessStatus) => {
      dispatch({ type: 'SET_GUESS_STATUS', payload: { guessStatus } });
    });
  }, [p2p, dispatch]);

  const sendGuessStatus = useCallback(
    (guessStatus: GuessStatus) => {
      dispatch({ type: 'SET_GUESS_STATUS', payload: { guessStatus } });
      p2p.sendGuessStatusUpdate(guessStatus);
    },
    [p2p]
  );

  return { sendGuessStatus };
};
