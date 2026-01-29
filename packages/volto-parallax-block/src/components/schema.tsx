import { defineMessages, type IntlShape } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import config from '@plone/volto/registry';

const messages = defineMessages({
  parallaxBlock: {
    id: 'Parallax Block',
    defaultMessage: 'Parallax Block',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  buttonText: {
    id: 'buttonText',
    defaultMessage: 'Button Text',
  },
  hideButton: {
    id: 'Hide Button',
    defaultMessage: 'Hide Button',
  },
  size: {
    id: 'size',
    defaultMessage: 'Block Height',
  },
  overlay: {
    id: 'overlay',
    defaultMessage: 'Overlay',
  },
  fontColor: {
    id: 'Font color',
    defaultMessage: 'Text Color / Contrast',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  href: {
    id: 'Link',
    defaultMessage: 'Link',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});


export const ParallaxSchema = ({ intl }: { intl: IntlShape }) => {
  return {
    title: intl.formatMessage(messages.parallaxBlock),
    block: 'parallax',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'url',
          'title',
          'description',
          'href',
          'openLinkInNewTab',
          'buttonText',
          'hideButton',
        ],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      url: {
        title: intl.formatMessage(messages.image),
        widget: 'image',
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'richtext',
      },
      buttonText: {
        title: intl.formatMessage(messages.buttonText),
        type: 'string',
        widget: 'textarea',
      },
      hideButton: {
        title: intl.formatMessage(messages.hideButton),
        type: 'boolean',
      },
      href: {
        title: intl.formatMessage(messages.href),
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
      },
    },
    required: [],
  };
};

export const ParallaxSchemaEnhancer = ({
  schema,
  intl,
}: {
  schema: any;
  intl: IntlShape;
}) => {
  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields.push('size');
  schema.properties.styles.schema.properties['size'] = {
    title: intl.formatMessage(messages.size),
    widget: 'size',
    default: 'm',
  };

  schema.properties.styles.schema.fieldsets[0].fields.push('align:noprefix');
  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'blockAlignment',
    title: intl.formatMessage(messages.Alignment),
    default: 'left',
  };

  schema.properties.styles.schema.fieldsets[0].fields.push('colors');
  schema.properties.styles.schema.properties.colors = {
    title: intl.formatMessage(messages.fontColor),
    widget: 'color_picker',
    colors: config.blocks.blocksConfig.parallax.themes,
  };
  return schema;
};
