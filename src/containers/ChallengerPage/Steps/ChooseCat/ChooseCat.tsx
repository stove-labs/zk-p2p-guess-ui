import { useCallback } from 'react';
import {
  Cat,
  PropsWithSteps,
} from '../../../../components/ChallengerPage/Stepper';
import { ChooseCat as ChooseCatComponent } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat';
import { data } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';

export const ChooseCat: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const handleCatConfirmed = useCallback((cat: Cat) => {
    console.log('cat confirmed', cat);
    nextStep();
  }, []);

  return (
    <ChooseCatComponent
      cats={data.storyCats}
      catsLoading={false}
      onCatConfirmed={handleCatConfirmed}
    />
  );
};
