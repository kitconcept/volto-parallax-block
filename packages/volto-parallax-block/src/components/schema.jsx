import { defineMessages } from 'react-intl';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  title: {
    id: 'Parallax Block',
    defaultMessage: 'Parallax Block',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  fontColor: {
    id: 'Font color',
    defaultMessage: 'Font color',
  },
});

export const ParallaxSchema = (props) => {
  const { intl } = props;
  const availableColors =
    config.blocks?.blocksConfig?.['parallaxBlock']?.availableColors;
  const imageUrl = isInternalURL(props.data.url)
    ? flattenToAppURL(props.data.url)
    : props.data.url;

  return {
    title: intl.formatMessage(messages.title),
    block: 'parallaxBlock',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['imageUrl', 'text', 'fontColor'],
      },
    ],

    properties: {
      imageUrl: {
        title: intl.formatMessage(messages.image),
        value: imageUrl,
        icon: props.data.url ? clearSVG : navTreeSVG,
        iconAction: props.data.url
          ? () => {
              props.resetSubmitUrl();
              props.onChangeBlock(props.block, {
                ...props.data,
                url: '',
              });
            }
          : () => props.openObjectBrowser(),
      },
      text: {
        title: intl.formatMessage(messages.text),
        widget: 'textarea',
      },
      fontColor: {
        widget: 'style_simple_color',
        title: intl.formatMessage(messages.fontColor),
        availableColors,
      },
    },
    required: [],
  };
};
