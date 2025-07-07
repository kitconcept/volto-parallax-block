import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  parallaxBlock: {
    id: 'Parallax Block',
    defaultMessage: 'Parallax Block',
  },
  parallaxTitle: {
    id: 'Parallax Title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  parallaxSpeed: {
    id: 'Parallax Speed',
    defaultMessage: 'Parallax Speed',
  },
  parallaxSpeedDesc: {
    id: 'Parallax Speed Description',
    defaultMessage: 'Adjust how fast the image scrolls compared to the text.',
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
          ? ['parallaxTitle', 'text']
          : ['parallaxTitle', 'text', 'parallaxSpeed'],
      },
    ],

    properties: {
      parallaxTitle: {
        title: intl.formatMessage(messages.parallaxTitle),
        type: 'string',
        widget: 'title',
      },
      text: {
        title: intl.formatMessage(messages.text),
        widget: 'textarea',
      },
      parallaxSpeed: {
        title: intl.formatMessage(messages.parallaxSpeed),
        description: intl.formatMessage(messages.parallaxSpeedDesc),
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
