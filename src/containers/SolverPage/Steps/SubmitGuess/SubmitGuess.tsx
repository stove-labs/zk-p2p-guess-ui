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
  const { submitGuess } = useSubmitGuess();
  const guessStatus = useSelectGuessStatus();

  useEffect(() => {
    guessStatus === 'STANDBY' && submitGuess(selectedCat);
  }, [selectedCat, guessStatus]);

  const status: SubmitGuessProps['status'] = useMemo(() => {
    console.log('status', guessStatus);
    switch (guessStatus) {
      case 'STANDBY':
        return 'GENERATING_PROOF';
      case 'PROVING':
        return 'GENERATING_PROOF';
      case 'SENT':
        return 'AWAITING_VALIDATION';
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
