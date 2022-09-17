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
GeneratingLink.args = {
  selectedCat: data.storyCats[0],
};

export const LinkReady = Template.bind({});
LinkReady.args = {
  peerId: '123',
  selectedCat: data.storyCats[0],
};
