import { InviteFriend } from './InviteFriend';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { data } from '../ChooseCat/ChooseCat.stories';

export default {
  component: InviteFriend,
} as ComponentMeta<typeof InviteFriend>;

const Template: ComponentStory<typeof InviteFriend> = (args) => (
  <InviteFriend {...args} />
);

export const GeneratingLink = Template.bind({});

export const linkReady = Template.bind({});
linkReady.args = {
  peerId: '123',
  selectedCat: data.storyCats[0],
};
