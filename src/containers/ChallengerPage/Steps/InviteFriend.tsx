import { useEffect, useMemo } from 'react';
import { PropsWithSteps } from '../../../components/ChallengerPage/Stepper';
import { data } from '../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { InviteFriend as InviteFriendComponent } from '../../../components/ChallengerPage/Steps/InviteFriend/InviteFriend';

export const InviteFriend: React.FC<PropsWithSteps<{}>> = ({ nextStep }) => {
  const peerId = useMemo(() => '', []);
  const selectedCat = data.storyCats[0];

  // when the peer connects, proceed to the next step
  useEffect(() => {
    setTimeout(nextStep, 3000);
  }, [nextStep]);
  return <InviteFriendComponent peerId={peerId} selectedCat={selectedCat} />;
};
