import { useEffect, useMemo } from 'react';
import { PropsWithSteps } from '../../../../components/ChallengerPage/Stepper';
import {
  useSelectGuessStatus,
  useSelectSelectedCat,
} from '../../../hooks/Store/selectors';
import { useSyncGuessStatus } from '../../../hooks/useSyncGuessStatus';
import {
  SubmitGuess as SubmitGuessComponent,
  SubmitGuessProps,
} from './../../../../components/SolverPage/Steps/SubmitGuess';
import { useSubmitGuess } from './hooks/useSubmitGuess';
export const SubmitGuess: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const selectedCat = useSelectSelectedCat();
  const { sendGuessStatus } = useSyncGuessStatus();
  const { submitGuess } = useSubmitGuess();
  const guessStatus = useSelectGuessStatus();

  useEffect(() => {
    // right away set status to proving
    sendGuessStatus('PROVING');
    // after a while submit a proof
    setTimeout(() => {
      sendGuessStatus('SENT');
      submitGuess('mock-proof');
    }, 3000);
  }, []);

  const status: SubmitGuessProps['status'] = useMemo(() => {
    switch (guessStatus) {
      case 'PROVING':
        return 'GENERATING_PROOF';
      case 'VALIDATING':
        return 'AWAITING_VALIDATION';
      case 'VALID':
        return 'RESULTS_READY';
      case 'INVALID':
        return 'RESULTS_READY';
      default:
        throw new Error('Invalid status');
    }
  }, [guessStatus]);

  return (
    <SubmitGuessComponent
      selectedCat={selectedCat!}
      status={status}
      onShowResults={nextStep}
    />
  );
};
