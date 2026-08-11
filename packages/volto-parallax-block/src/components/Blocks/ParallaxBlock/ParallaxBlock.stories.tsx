import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import Wrapper from '@plone/volto/storybook';
import ParallaxView from './View';
import type { ParallaxBlockData, RichTextValue } from './types';
import config from '@plone/volto/registry';

type StoryParams = {
  containerWidth?: number;
};

const withWrapper: Decorator = (Story, context) => {
  const params = (context?.parameters || {}) as StoryParams;
  const containerWidth = params.containerWidth ?? 960;

  return (
    <Wrapper anonymous>
      <div style={{ width: containerWidth, padding: 24 }}>
        <Story />
      </div>
    </Wrapper>
  );
};

const descriptionText: RichTextValue = {
  data: 'Malesuada aliquet nisi id habitasse mi ad mollis fames vel. Elit donec ex odio consectetuer nam in volutpat libero quam adipiscing. Vehicula ex semper parturient fringilla nam nibh aenean dis nec euismod odio.',
};

const baseData: ParallaxBlockData = {
  url: 'https://kitconcept.com/de/projekte/dlr-web-relaunch-2023/dlr_1.jpg/@@images/image-2880-8586fbd83536eb9b56bf8bb6a0479796.jpeg',
  overlay: 'full_overlay',
  title: 'Lorem ipsum',
  description: descriptionText,
  buttonText: 'Button',
  hideButton: false,
  size: 'm',
  align: 'left',
  colors: 'black',
};

const meta = {
  title: 'Public/Blocks/ParallaxBlock',
  component: ParallaxView,
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    blocksConfig: config.blocks.blocksConfig,
  },
  argTypes: {
    data: { control: 'object' },
    className: { control: 'text' },
    isEditMode: { control: 'boolean' },
  },
} satisfies Meta<typeof ParallaxView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: baseData,
  },
};

export const LargeSize: Story = {
  args: {
    data: { ...baseData, size: 'l' },
  },
};

export const MediumSize: Story = {
  args: {
    data: { ...baseData, size: 'm' },
  },
};

export const SmallSize: Story = {
  parameters: { containerWidth: 480 },
  args: {
    data: { ...baseData, size: 's' },
  },
};

export const AlignLeft: Story = {
  args: {
    data: { ...baseData, align: 'left' },
  },
};

export const AlignCenter: Story = {
  args: {
    data: { ...baseData, align: 'center' },
  },
};

export const AlignRight: Story = {
  args: {
    data: { ...baseData, align: 'right' },
  },
};
