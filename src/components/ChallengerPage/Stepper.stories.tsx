import { Stepper, Step, StepperProps } from './Stepper';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';
import { data } from './Steps/ChooseCat/ChooseCat.stories';
import { InviteFriend } from './Steps/InviteFriend/InviteFriend';

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

const MockInviteFriend: Step['content'] = ({ nextStep }) => <InviteFriend />;

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
    content: MockChooseCat,
  },
  {
    label: '🏆 Results',
    description: `Who won?`,
    content: MockChooseCat,
  },
];

export const Default = Template.bind({});
Default.args = {
  steps,
};
