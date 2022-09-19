import { useMemo } from 'react';
import { Stepper, Step } from '../../components/ChallengerPage/Stepper';
import { data } from '../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { AwaitGuess } from './Steps/AwaitGuess/AwaitGuess';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';
import { InviteFriend } from './Steps/InviteFriend/InviteFriend';
import { WhoWon } from './Steps/WhoWon/WhoWon';

// container responsible for orchestrating challenge steps for the Challenger
export const ChallengerPage: React.FC = () => {
  const steps: Step[] = useMemo(() => {
    return [
      // load all cats, let the user select one and then allow them to proceed
      {
        label: '🐱 Choose a cat',
        description: `Meow, meow!`,
        content: ChooseCat,
      },
      // setup the p2p connection, wait for the 2nd player to connect, handover the challenge and then proceed
      {
        label: '🔗 Invite a friend',
        description: 'Share a link',
        content: InviteFriend,
      },
      // wait for a guess attempt then validate it, send back confirmation about the result to the second player
      // then proceed to showing results
      // status: GUESSING | PROVING | VALIDATING
      {
        label: '⏳ Wait for a guess',
        description: `Friend's turn`,
        content: AwaitGuess,
      },
      // show results of the game
      {
        label: '🏆 Results',
        description: `Who won?`,
        content: WhoWon,
      },
    ];
  }, []);
  return <Stepper steps={steps} />;
};
