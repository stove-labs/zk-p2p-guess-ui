import { useCallback } from 'react';
import { submitGuess } from '../../../../../lib/p2p';
import { useP2PContext } from '../../../../hooks/useP2P';

export const useSubmitGuess = () => {
  const { submitGuess } = useP2PContext();
  const _submitGuess = useCallback(
    (proof: string) => {
      submitGuess(proof);
    },
    [submitGuess]
  );

  return { submitGuess: _submitGuess };
};
