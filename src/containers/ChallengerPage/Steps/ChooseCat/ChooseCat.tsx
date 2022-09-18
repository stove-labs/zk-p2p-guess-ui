import { useCallback, useEffect, useMemo } from 'react';
import {
  Cat,
  PropsWithSteps,
} from '../../../../components/ChallengerPage/Stepper';
import { data } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { ChooseCat as ChooseCatComponent } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat';
import { useCats } from '../../../Store/selectors';
import { useLoadCats, useSetSecret } from '../../../Store/actions';

/**
 * Container responsible for handling the first step of our game from the Challenger's perspective.
 */
export const ChooseCat: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const loadCats = useLoadCats();
  const setSecret = useSetSecret();
  const cats = useCats();

  // load cats right away
  useEffect(() => {
    loadCats();
  }, [loadCats]);

  // when cat selection is confirmed, move to the next step
  const handleCatConfirmed = useCallback((cat: Cat) => {
    setSecret(cat);
    nextStep();
  }, []);

  const catsLoading = useMemo(() => cats.status !== 'LOADED', [cats.status]);
  console.log('cats', cats);

  return (
    <ChooseCatComponent
      cats={cats.data}
      catsLoading={catsLoading}
      onCatConfirmed={handleCatConfirmed}
    />
  );
};
