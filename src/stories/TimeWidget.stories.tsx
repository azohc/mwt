import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TimeWidget from "../components/TimeWidget";

export default {
  title: "Widgets/TimeWidget",
  component: TimeWidget,
  argTypes: {
    date: { control: "date" },
    editable: { control: "boolean" },
  },
} as ComponentMeta<typeof TimeWidget>;

const Template: ComponentStory<typeof TimeWidget> = (args) => (
  <TimeWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  editable: false,
  date: new Date(),
};

export const Editable = Template.bind({});
Editable.args = {
  editable: true,
  date: new Date(),
};
