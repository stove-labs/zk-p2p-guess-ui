import { useEffect, useMemo } from 'react';
import { PropsWithSteps } from '../../../../components/ChallengerPage/Stepper';
import {
  InviteFriend as InviteFriendComponent,
  InviteFriendProps,
} from '../../../../components/ChallengerPage/Steps/InviteFriend/InviteFriend';
import { useCreatePeerLazy } from '../../../hooks/useCreatePeer';
import {
  useSelectChallenge,
  useSelectPeerId,
  useSelectSecret,
  useSelectSelectedCat,
} from '../../../hooks/Store/selectors';
import { useHandoverChallenge } from './hooks/useHandoverChallenge';
import { useCreateChallengeLazy } from './hooks/useCreateChallenge';

/**
 * Container responsible for handing over the challenge over P2P
 */
export const InviteFriend: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const peerId = useSelectPeerId();
  const selectedCat = useSelectSelectedCat();
  const challenge = useSelectChallenge();
  const createChallenge = useCreateChallengeLazy();

  useHandoverChallenge(nextStep);

  useEffect(() => {
    createChallenge();
  }, []);

  const status: InviteFriendProps['status'] = useMemo(() => {
    return challenge?.status === 'READY' ? 'LINK_READY' : 'AWAITING_LINK';
  }, [challenge]);

  // TODO: get rid of '!' + find a cat by the secret it
  return (
    <InviteFriendComponent
      status={status}
      peerId={peerId}
      selectedCat={selectedCat!}
    />
  );
};
