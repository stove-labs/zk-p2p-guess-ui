import { useEffect, useMemo } from 'react';
import { PropsWithSteps } from '../../../../components/ChallengerPage/Stepper';
import { data } from '../../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { InviteFriend as InviteFriendComponent } from '../../../../components/ChallengerPage/Steps/InviteFriend/InviteFriend';
import { useCreatePeerLazy } from '../../../hooks/useCreatePeer';
import {
  useSelectPeerId,
  useSelectSecret,
  useSelectSelectedCat,
} from '../../../hooks/Store/selectors';
import { useHandoverChallenge } from './hooks/useHandoverChallenge';

/**
 * Container responsible for handing over the challenge over P2P
 */
export const InviteFriend: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const peerId = useSelectPeerId();
  const selectedCat = useSelectSelectedCat();

  useHandoverChallenge(nextStep);

  // when the peer connects, proceed to the next step
  useEffect(() => {
    // setTimeout(nextStep, 3000);
  }, [nextStep]);
  // TODO: get rid of '!' + find a cat by the secret it
  return <InviteFriendComponent peerId={peerId} selectedCat={selectedCat!} />;
};
