import { defineMessages } from 'react-intl';

const messages = defineMessages({
  parallaxBlock: {
    id: 'Parallax Block',
    defaultMessage: 'Parallax Block',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
});

export const ParallaxSchema = (props) => {
  const { intl } = props;

  return {
    block: 'parallax',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['text'],
      },
    ],

    properties: {
      text: {
        title: intl.formatMessage(messages.text),
        widget: 'textarea',
      },
    },
    required: [],
  };
};
