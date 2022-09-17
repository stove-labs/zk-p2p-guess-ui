import { WhoWon } from './WhoWon';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { data } from '../ChooseCat/ChooseCat.stories';

export default {
  component: WhoWon,
} as ComponentMeta<typeof WhoWon>;

const Template: ComponentStory<typeof WhoWon> = (args) => <WhoWon {...args} />;

export const YouWonChallenger = Template.bind({});
YouWonChallenger.args = {
  selectedCat: data.storyCats[0],
  status: 'YOU_WON',
  type: 'CHALLENGER',
};

export const YouWonSolver = Template.bind({});
YouWonSolver.args = {
  selectedCat: data.storyCats[0],
  status: 'YOU_WON',
  type: 'SOLVER',
};

export const TheyWonChallenger = Template.bind({});
TheyWonChallenger.args = {
  selectedCat: data.storyCats[0],
  status: 'THEY_WON',
  type: 'CHALLENGER',
};

export const TheyWonSolver = Template.bind({});
TheyWonSolver.args = {
  selectedCat: data.storyCats[0],
  status: 'THEY_WON',
  type: 'SOLVER',
};
