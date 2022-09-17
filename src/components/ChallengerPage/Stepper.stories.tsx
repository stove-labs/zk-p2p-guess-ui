import { Stepper, Step, StepperProps } from './Stepper';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';
import { data } from './Steps/ChooseCat/ChooseCat.stories';
import { InviteFriend } from './Steps/InviteFriend/InviteFriend';
import { AwaitGuess, AwaitGuessProps } from './Steps/AwaitGuess/AwaitGuess';
import { useEffect, useState } from 'react';
import { WhoWon } from './Steps/WhoWon/WhoWon';

export default {
  component: Stepper,
  subcomponents: { ChooseCat },
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => (
  <Stepper {...args} />
);

const MockChooseCat: Step['content'] = ({ nextStep }) => (
  <ChooseCat
    catsLoading={false}
    cats={data.storyCats}
    onCatConfirmed={nextStep}
  />
);

const MockInviteFriend: Step['content'] = ({ nextStep }) => {
  const [peerId, setPeerId] = useState<string>();
  // automatically navigate to the next step in 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setPeerId('mock-peer-id');
      setTimeout(nextStep, 3000);
    }, 3000);
  }, []);
  return <InviteFriend selectedCat={data.storyCats[0]} peerId={peerId} />;
};
const MockAwaitGuess: Step['content'] = ({ nextStep }) => {
  const [status, setStatus] =
    useState<AwaitGuessProps['status']>('AWAITING_GUESS');
  useEffect(() => {
    setTimeout(() => {
      setStatus('AWAITING_PROOF');
      setTimeout(() => {
        setStatus('VALIDATING_PROOF');
        setTimeout(nextStep, 3000);
      }, 3000);
    }, 3000);
  }, []);
  return <AwaitGuess selectedCat={data.storyCats[0]} status={status} />;
};

const steps: Step[] = [
  {
    label: '🐱 Choose a cat',
    description: `Meow, meow!`,
    content: MockChooseCat,
  },
  {
    label: 'Invite a friend',
    description: '🔗 Share a link',
    content: MockInviteFriend,
  },
  {
    label: '⏳ Wait for a guess',
    description: `Friend's turn`,
    content: MockAwaitGuess,
  },
  {
    label: '🏆 Results',
    description: `Who won?`,
    content: ({ nextStep }) => (
      <WhoWon
        status={'YOU_WON'}
        type={'CHALLENGER'}
        selectedCat={data.storyCats[0]}
      />
    ),
  },
];

export const Default = Template.bind({});
Default.args = {
  steps,
};
