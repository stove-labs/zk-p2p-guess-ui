import { useCallback } from 'react';
import { Cat } from '../../../../../components/ChallengerPage/Stepper';
import { submitGuess } from '../../../../../lib/p2p';
import { runWorkerWithMessage } from '../../../../../lib/workers';
import { JsonProof } from '../../../../../lib/zk/getProofFromGuess';
import { useSelectChallenge } from '../../../../hooks/Store/selectors';
import { useP2PContext } from '../../../../hooks/useP2P';
import { useSyncGuessStatus } from '../../../../hooks/useSyncGuessStatus';

export const useSubmitGuess = () => {
  const { submitGuess } = useP2PContext();
  const { sendGuessStatus } = useSyncGuessStatus();
  const challenge = useSelectChallenge();

  const _submitGuess = useCallback(
    async (cat: Cat) => {
      // TODO: handle this case properly
      if (!challenge.public) return;
      sendGuessStatus('PROVING');
      const contract = {
        verificationKey: challenge.public.verificationKey!,
        state: challenge.public.secretHash!,
      };
      const guess = cat.secret;
      // TODO: try-catch if the proof generation fails
      try {
        const proof = await runWorkerWithMessage<
          {
            contract: {
              verificationKey: string;
              state: string;
            };
            guess: string;
          },
          JsonProof
        >(
          new Worker(
            new URL('/src/lib/zk/getProofFromGuess.ts', import.meta.url),
            {
              type: 'module',
            }
          ),
          { contract, guess }
        );
        console.log('proof', proof);
        submitGuess(proof);
      } catch (e) {
        submitGuess();
      }
      sendGuessStatus('SENT');
    },
    [submitGuess, challenge]
  );

  return { submitGuess: _submitGuess };
};
