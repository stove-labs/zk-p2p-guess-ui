import { AwaitGuess } from './AwaitGuess';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { data } from '../ChooseCat/ChooseCat.stories';

export default {
  component: AwaitGuess,
} as ComponentMeta<typeof AwaitGuess>;

const Template: ComponentStory<typeof AwaitGuess> = (args) => (
  <AwaitGuess {...args} />
);

export const AwaitingGuess = Template.bind({});
AwaitingGuess.args = {
  selectedCat: data.storyCats[0],
  status: 'AWAITING_GUESS',
};

export const AwaitingProof = Template.bind({});
AwaitingProof.args = {
  selectedCat: data.storyCats[0],
  status: 'AWAITING_PROOF',
};

export const ValidatingProof = Template.bind({});
ValidatingProof.args = {
  selectedCat: data.storyCats[0],
  status: 'VALIDATING_PROOF',
};
