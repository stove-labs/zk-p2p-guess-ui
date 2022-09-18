import { useEffect } from 'react';
import { GuessStatus } from '../../../../hooks/Store/reducer';
import { useStoreContext } from '../../../../hooks/Store/useStore';
import { useP2P, useP2PContext } from '../../../../hooks/useP2P';

export const useReceiveGuess = (
  sendGuessStatus: (guessStatus: GuessStatus) => void
) => {
  const { receiveGuess } = useP2PContext();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    (async () => {
      const guess = await receiveGuess();
      dispatch({
        type: 'SET_GUESS',
        payload: {
          // TODO: get rid of '!'
          proof: guess!,
        },
      });
    })();
  }, [receiveGuess]);

  useEffect(() => {
    if (!state.guess.proof) return;
    // validate proof and send back guess status
    sendGuessStatus('VALIDATING');
    setTimeout(() => {
      sendGuessStatus('VALID');
    }, 3000);
  }, [state.guess.proof]);
};
