import { useCallback, useMemo } from 'react';
import {
  Cat,
  PropsWithSteps,
} from '../../../components/ChallengerPage/Stepper';
import { data } from '../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { ChooseCat as ChooseCatComponent } from './../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat';

/**
 * Container responsible for handling the first step of our game from the Challenger's perspective.
 */
export const ChooseCat: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  // when cat selection is confirmed, move to the next step
  const handleCatConfirmed = useCallback((cat: Cat) => {
    console.log('cat confirmed', cat);
    // TODO: update challenge state with the selected cat
    // move to the next step
    nextStep();
  }, []);

  const cats = useMemo(() => data.storyCats, []);
  const catsLoading = useMemo(() => false, []);

  return (
    <ChooseCatComponent
      cats={cats}
      catsLoading={catsLoading}
      onCatConfirmed={handleCatConfirmed}
    />
  );
};
