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
  ButtonText: {
    id: 'ButtonText',
    defaultMessage: 'Button Text',
  },
  HideButton: {
    id: 'HideButton',
    defaultMessage: 'Hide Button',
  },
  BlockHeight: {
    id: 'BlockHeight',
    defaultMessage: 'Block Height',
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
          ? [
              'Title',
              'Text',
              'Align',
              'ButtonText',
              'HideButton',
              'BlockHeight',
            ]
          : [
              'Title',
              'Text',
              'Align',
              'ButtonText',
              'HideButton',
              'BlockHeight',
              'Speed',
            ],
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
        widget: 'align',
        default: 'center',
        actions: ['left', 'center'],
      },
      ButtonText: {
        title: intl.formatMessage(messages.ButtonText),
        type: 'string',
        widget: 'textarea',
      },
      HideButton: {
        title: intl.formatMessage(messages.HideButton),
        type: 'boolean',
        default: false,
      },
      Speed: {
        title: intl.formatMessage(messages.Speed),
        description: intl.formatMessage(messages.SpeedDesc),
        widget: 'select',
        default: 'medium',
        choices: [
          ['slow', 'Slow'],
          ['medium', 'Medium'],
          ['fast', 'Fast'],
        ],
        isClearable: false,
      },
      BlockHeight: {
        title: intl.formatMessage(messages.BlockHeight),
        widget: 'select',
        default: 'medium',
        choices: [
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['large', 'Large'],
        ],
        isClearable: false,
      },
    },
    required: [],
  };
};
