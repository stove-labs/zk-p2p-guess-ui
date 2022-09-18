import { SubmitGuess } from './SubmitGuess';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { data } from '../../ChallengerPage/Steps/ChooseCat/ChooseCat.stories';

export default {
  component: SubmitGuess,
} as ComponentMeta<typeof SubmitGuess>;

const Template: ComponentStory<typeof SubmitGuess> = (args) => (
  <SubmitGuess {...args} />
);

export const GeneratingProof = Template.bind({});
GeneratingProof.args = {
  selectedCat: data.storyCats[0],
  status: 'GENERATING_PROOF',
  onShowResults: () => {},
};

export const ResultsReady = Template.bind({});
ResultsReady.args = {
  selectedCat: data.storyCats[0],
  status: 'RESULTS_READY',
  onShowResults: () => {},
};
