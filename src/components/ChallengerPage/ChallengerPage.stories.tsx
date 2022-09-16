import { ChallengerPage } from './ChallengerPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: ChallengerPage,
} as ComponentMeta<typeof ChallengerPage>;

const Template: ComponentStory<typeof ChallengerPage> = () => (
  <ChallengerPage />
);

export const Default = Template.bind({});
