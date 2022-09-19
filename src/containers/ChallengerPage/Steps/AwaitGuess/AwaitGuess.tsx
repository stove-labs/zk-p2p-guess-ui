import { data } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import {
  useSelectGuessStatus,
  useSelectSelectedCat,
} from '../../../hooks/Store/selectors';
import {
  AwaitGuess as AwaitGuessComponent,
  AwaitGuessProps,
} from '../../../../components/ChallengerPage/Steps/AwaitGuess/AwaitGuess';
import { useSyncGuessStatus } from '../../../hooks/useSyncGuessStatus';
import { useMemo } from 'react';
import { useReceiveGuess } from './hooks/useReceiveGuess';
import { PropsWithSteps } from '../../../../components/ChallengerPage/Stepper';
export const AwaitGuess: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const selectedCat = useSelectSelectedCat();
  const guessStatus = useSelectGuessStatus();

  const { sendGuessStatus } = useSyncGuessStatus();
  useReceiveGuess(sendGuessStatus);

  const status: AwaitGuessProps['status'] = useMemo(() => {
    switch (guessStatus) {
      case 'GUESSING':
        return 'AWAITING_GUESS';
      case 'PROVING':
        return 'AWAITING_PROOF';
      case 'VALIDATING':
        return 'VALIDATING_PROOF';
      case 'VALID':
        return 'RESULTS_READY';
      case 'INVALID':
        return 'RESULTS_READY';

      default:
        throw new Error('Invalid status');
    }
  }, [guessStatus]);

  return (
    <AwaitGuessComponent
      onShowResults={nextStep}
      status={status}
      selectedCat={selectedCat!}
    />
  );
};
