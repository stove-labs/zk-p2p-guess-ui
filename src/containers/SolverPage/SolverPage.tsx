import { useMemo } from 'react';
import { Stepper, Step } from '../../components/ChallengerPage/Stepper';
import { data } from '../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { WhoWon } from '../../components/ChallengerPage/Steps/WhoWon/WhoWon';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';
import { SubmitGuess } from './Steps/SubmitGuess/SubmitGuess';

export const SolverPage: React.FC = () => {
  const steps: Step[] = useMemo(() => {
    return [
      // Wait for the challenge handover and then show the cats from the challenge, setup the p2p connection
      {
        label: '🐱 Choose a cat',
        description: `Meow, meow!`,
        content: ChooseCat,
      },
      // Attempt to prove the guess, let the challenger know how the guess went with the proof (or no proof)
      {
        label: '🚀 Submit guess',
        description: `Let them know`,
        content: SubmitGuess,
      },
      // show results of the game
      {
        label: '🏆 Results',
        description: `Who won?`,
        content: ({ nextStep }) => (
          <WhoWon
            selectedCat={data.storyCats[0]}
            status={'YOU_WON'}
            type={'SOLVER'}
          />
        ),
      },
    ];
  }, []);
  return <Stepper steps={steps} />;
};
