import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  parallaxBlock: {
    id: 'Parallax Block',
    defaultMessage: 'Parallax Block',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  Text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  Speed: {
    id: 'Speed',
    defaultMessage: 'Parallax Speed',
  },
  SpeedDesc: {
    id: 'Parallax Speed Description',
    defaultMessage: 'Adjust how fast the image scrolls compared to the text.',
  },
  Align: {
    id: 'Align',
    defaultMessage: 'Text Alignment',
  },
});

export const ParallaxSchema = (props) => {
  const { intl } = props;
  const blockConfig = config.blocks.blocksConfig.parallax;

  return {
    block: 'parallax',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: blockConfig.hasFixedSpeed
          ? ['Title', 'Text', 'Align']
          : ['Title', 'Text', 'Align', 'Speed'],
      },
    ],

    properties: {
      Title: {
        title: intl.formatMessage(messages.Title),
        type: 'string',
        widget: 'title',
      },
      Text: {
        title: intl.formatMessage(messages.Text),
        widget: 'textarea',
      },
      Align: {
        title: intl.formatMessage(messages.Align),
        description: 'Choose the alignment of the text over the image.',
        widget: 'align',
        default: 'center',
        actions: ['left', 'center', 'right'],
      },
      Speed: {
        title: intl.formatMessage(messages.Speed),
        description: intl.formatMessage(messages.SpeedDesc),
        type: 'string',
        widget: 'select',
        choices: [
          ['slow', 'Slow'],
          ['medium', 'Medium'],
          ['fast', 'Fast'],
        ],
        default: 'medium',
        isClearable: false,
      },
    },
    required: [],
  };
};
