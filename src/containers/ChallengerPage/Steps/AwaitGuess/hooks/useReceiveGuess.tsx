import { useEffect } from 'react';
import { runWorkerWithMessage } from '../../../../../lib/workers';
import { JsonProof } from '../../../../../lib/zk/getProofFromGuess';
import { GuessStatus } from '../../../../hooks/Store/reducer';
import { useSelectGuessStatus } from '../../../../hooks/Store/selectors';
import { useStoreContext } from '../../../../hooks/Store/useStore';
import { useP2P, useP2PContext } from '../../../../hooks/useP2P';

export const useReceiveGuess = (
  sendGuessStatus: (guessStatus: GuessStatus) => void
) => {
  const { receiveGuess } = useP2PContext();
  const [state, dispatch] = useStoreContext();
  const guessStatus = useSelectGuessStatus();

  useEffect(() => {
    (async () => {
      const guess = await receiveGuess();
      console.log('received guess', guess);
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
    if (guessStatus === 'RECEIVED') {
      console.log('received guess, can validate now');
      // validate proof and send back guess status
      sendGuessStatus('VALIDATING');
      (async () => {
        console.log('about to validate', {
          proof: state.guess.proof,
          guessStatus,
          verificationKey: state.challenge.public?.verificationKey,
        });
        let proofValid;
        try {
          proofValid = await runWorkerWithMessage<
            {
              proof: JsonProof;
              verificationKey: string;
            },
            boolean
          >(
            new Worker(new URL('/src/lib/zk/verifyProof.ts', import.meta.url), {
              type: 'module',
            }),
            // TODO: get rid of '!'
            {
              proof: state.guess.proof!,
              verificationKey: state.challenge.public!.verificationKey!,
            }
          );
        } catch (e) {}
        console.log('proof valid?', proofValid, state.guess.proof);
        proofValid ? sendGuessStatus('VALID') : sendGuessStatus('INVALID');
      })();
    }
  }, [state, guessStatus]);
};
