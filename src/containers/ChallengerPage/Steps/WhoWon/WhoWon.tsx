import { useMemo } from 'react';
import {
  useSelectGuessStatus,
  useSelectSelectedCat,
} from '../../../hooks/Store/selectors';
import {
  WhoWon as WhoWonComponent,
  WhoWonProps,
} from './../../../../components/ChallengerPage/Steps/WhoWon/WhoWon';
export const WhoWon: React.FC = () => {
  const selectedCat = useSelectSelectedCat();
  const guessStatus = useSelectGuessStatus();
  const status: WhoWonProps['status'] = useMemo(() => {
    switch (guessStatus) {
      case 'VALID':
        return 'THEY_WON';
      case 'INVALID':
        return 'YOU_WON';
      default:
        throw new Error('Invalid status');
    }
  }, [guessStatus]);
  return (
    <WhoWonComponent
      type={'CHALLENGER'}
      selectedCat={selectedCat}
      status={status}
    />
  );
};
