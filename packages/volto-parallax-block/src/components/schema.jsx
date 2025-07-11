import { defineMessages } from 'react-intl';
import textCenteredSVG from '@plone/volto/icons/align-center.svg';
import textLeftSVG from '@plone/volto/icons/align-left.svg';

const messages = defineMessages({
  parallaxBlock: {
    id: 'Parallax Block',
    defaultMessage: 'Parallax Block',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  align: {
    id: 'Align',
    defaultMessage: 'Text Alignment',
  },
  buttonText: {
    id: 'buttonText',
    defaultMessage: 'Button Text',
  },
  hideButton: {
    id: 'HideButton',
    defaultMessage: 'Hide Button',
  },
  size: {
    id: 'size',
    defaultMessage: 'Image size',
  },
  fontColor: {
    id: 'Font Color',
    defaultMessage: 'Font Color',
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
        fields: [
          'title',
          'text',
          'align',
          'size',
          'buttonText',
          'hideButton',
          'fontColor',
        ],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
        type: 'string',
        widget: 'title',
      },
      text: {
        title: intl.formatMessage(messages.text),
        widget: 'textarea',
      },
      align: {
        title: intl.formatMessage(messages.align),
        widget: 'buttons',
        default: 'centered',
        actions: ['left', 'centered'],
        actionsInfoMap: {
          left: [textLeftSVG, 'Text Left'],
          centered: [textCenteredSVG, 'Text Centered'],
        },
      },
      buttonText: {
        title: intl.formatMessage(messages.buttonText),
        type: 'string',
        widget: 'textarea',
      },
      hideButton: {
        title: intl.formatMessage(messages.hideButton),
        type: 'boolean',
        default: false,
      },
      size: {
        title: intl.formatMessage(messages.size),
        widget: 'size',
        default: 'l',
      },
      fontColor: {
        title: intl.formatMessage(messages.fontColor),
        widget: 'color_picker',
        colors: [
          {
            name: 'parallax-custom-color-1',
            label: 'White',
          },
          {
            name: 'parallax-custom-color-2',
            label: 'Black',
          },
        ],
        default: 'parallax-custom-color-1',
      },
    },
    required: [],
  };
};
