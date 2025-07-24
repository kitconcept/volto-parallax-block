import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

import config from '@plone/volto/registry';

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
    id: 'fontColor',
    defaultMessage: 'Font Color',
  },
  style: {
    id: 'style',
    defaultMessage: 'Style',
  },
});

export function ParallaxSchema(props) {
  const { intl } = props;
  let schema = {
    title: intl.formatMessage(messages.parallaxBlock),
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
          'style',
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
        default: 'parallax-custom-color-1',
        required: true,
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
      },
      style: {
        title: intl.formatMessage(messages.style),
        type: 'string',
        widget: 'select',
        default: 'default',
        required: true,
        choices: [
          ['default', 'Default'],
          ['outlined-textbox', 'outlined-Textbox'],
          ['solid-textbox', 'solid-Textbox'],
        ],
      },
    },
    required: [],
  };

  const fontColors = config.blocks?.blocksConfig.parallax.fontColors;

  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields = ['fontColor'];
  schema.properties.styles.schema.properties.fontColor = {
    title: intl.formatMessage(messages.fontColor),
    widget: 'color_picker',
    colors: fontColors,
    default: 'parallax-font-black',
  };

  return schema;
}
