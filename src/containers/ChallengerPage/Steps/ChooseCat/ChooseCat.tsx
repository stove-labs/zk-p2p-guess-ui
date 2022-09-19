import { useCallback, useEffect, useMemo } from 'react';
import {
  Cat,
  PropsWithSteps,
} from '../../../../components/ChallengerPage/Stepper';
import { data } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { ChooseCat as ChooseCatComponent } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat';
import { useSelectCats } from '../../../hooks/Store/selectors';
import { useLoadCatsLazy } from './hooks/useLoadCats';
import { useSetSecret } from './hooks/useSetSecret';

/**
 * Container responsible for selecting a secret (cat) as the first step of the challenge stepper.
 */
export const ChooseCat: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const loadCats = useLoadCatsLazy();
  const setSecret = useSetSecret();
  const cats = useSelectCats();

  // load cats right away
  useEffect(() => {
    loadCats();
  }, []);

  // when cat selection is confirmed, set the secret and move to the next step
  const handleCatConfirmed = useCallback((cat: Cat) => {
    setSecret(cat.secret);
    nextStep();
  }, []);

  // unless cats are ready, they must be loading
  const catsLoading = useMemo(() => cats.status !== 'READY', [cats.status]);

  return (
    <ChooseCatComponent
      cats={cats.data}
      catsLoading={catsLoading}
      onCatConfirmed={handleCatConfirmed}
    />
  );
};
