import { Stepper, Step, StepperProps } from './Stepper';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';
import { data } from './Steps/ChooseCat/ChooseCat.stories';

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

const steps: Step[] = [
  {
    label: '🐱 Choose a cat',
    description: `Meow, meow!`,
    content: MockChooseCat,
  },
  {
    label: '🔗 Share a link',
    description: 'Invite a friend',
    content: MockChooseCat,
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
