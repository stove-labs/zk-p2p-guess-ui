import { useEffect } from 'react';
import { runWorkerWithMessage } from '../../../../../lib/workers';
import { JsonProof } from '../../../../../lib/zk/getProofFromGuess';
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
    if (!state.guess.proof) return;
    // validate proof and send back guess status
    sendGuessStatus('VALIDATING');
    (async () => {
      try {
        console.log('about to validate', {
          proof: state.guess.proof,
          verificationKey: state.challenge.public?.verificationKey,
        });
        const proofValid = await runWorkerWithMessage<
          {
            proof: JsonProof;
            verificationKey: string;
          },
          boolean
        >(
          'lib/zk/verifyProof.ts',
          // TODO: get rid of '!'
          {
            proof: state.guess.proof!,
            verificationKey: state.challenge.public!.verificationKey!,
          }
        );
        console.log('proof valid?', proofValid, state.guess.proof);
        proofValid ? sendGuessStatus('VALID') : sendGuessStatus('INVALID');
      } catch (e) {
        console.log('something went wrong while validating');

        sendGuessStatus('INVALID');
      }
    })();
  }, [state.guess.proof]);
};
