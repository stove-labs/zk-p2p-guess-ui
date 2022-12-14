import { HomePage } from './HomePage';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => (
  <HomePage onGameStart={() => {}} />
);

export const Default = Template.bind({});
