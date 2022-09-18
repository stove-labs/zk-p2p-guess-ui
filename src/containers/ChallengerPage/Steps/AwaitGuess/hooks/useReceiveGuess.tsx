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
      console.log('guess received', guess);
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
    console.log('guess proof effect', state.guess);
    if (!state.guess.proof) return;
    // validate proof and send back guess status
    console.log('proof received', state.guess.proof);
    sendGuessStatus('VALIDATING');
    setTimeout(() => {
      sendGuessStatus('VALID');
    }, 3000);
  }, [state.guess.proof]);
};
