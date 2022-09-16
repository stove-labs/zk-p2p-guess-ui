import { useMemo } from 'react';
import { Stepper, Step } from '../../components/ChallengerPage/Stepper';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';

export const ChallengerPage: React.FC = () => {
  const content = ChooseCat;

  const steps: Step[] = useMemo(() => {
    return [
      {
        label: '🐱 Choose a cat',
        description: `Meow, meow!`,
        content,
      },
      {
        label: '🔗 Share a link',
        description: 'Invite a friend',
        content,
      },
      {
        label: '⏳ Wait for a guess',
        description: `Friend's turn`,
        content,
      },
      {
        label: '🏆 Results',
        description: `Who won?`,
        content,
      },
    ];
  }, []);
  return <Stepper steps={steps} />;
};
