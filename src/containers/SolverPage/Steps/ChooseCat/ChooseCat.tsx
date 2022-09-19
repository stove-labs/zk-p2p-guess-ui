import { useCallback, useEffect, useMemo } from 'react';
import {
  Cat,
  PropsWithSteps,
} from '../../../../components/ChallengerPage/Stepper';
import { data } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { ChooseCat as ChooseCatComponent } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat';
import {
  useSelectCats,
  useSelectCatsShuffled,
} from '../../../hooks/Store/selectors';
import { useCreatePeerLazy } from '../../../hooks/useCreatePeer';
import {
  useConnectPeer,
  useRequestChallenge,
} from './hooks/useRequestChallenge';
import { useSetSecret } from './hooks/useSetSecret';

/**
 * Container responsible for handling the first step of our game from the Solver's perspective.
 */
export const ChooseCat: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const cats = useSelectCatsShuffled();
  const setSecret = useSetSecret();
  useRequestChallenge();

  // when cat selection is confirmed, move to the next step
  const handleCatConfirmed = useCallback((cat: Cat) => {
    setSecret(cat.secret);
    nextStep();
  }, []);

  const catsLoading = useMemo(() => cats.status !== 'READY', [cats.status]);

  return (
    <ChooseCatComponent
      cats={cats.data}
      catsLoading={catsLoading}
      onCatConfirmed={handleCatConfirmed}
    />
  );
};
