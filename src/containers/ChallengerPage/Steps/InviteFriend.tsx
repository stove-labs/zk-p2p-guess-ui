import { useEffect, useMemo } from 'react';
import { PropsWithSteps } from '../../../components/ChallengerPage/Stepper';
import { data } from '../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { InviteFriend as InviteFriendComponent } from '../../../components/ChallengerPage/Steps/InviteFriend/InviteFriend';
import { useCreatePeer } from '../../Store/actions';
import { usePeerId, useSecret } from '../../Store/selectors';

export const InviteFriend: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const peerId = usePeerId();
  const secret = useSecret();
  const createPeer = useCreatePeer();

  useEffect(() => {
    createPeer();
  }, [createPeer]);

  // when the peer connects, proceed to the next step
  useEffect(() => {
    // setTimeout(nextStep, 3000);
  }, [nextStep]);
  // TODO: get rid of '!'
  return <InviteFriendComponent peerId={peerId} selectedCat={secret!} />;
};
