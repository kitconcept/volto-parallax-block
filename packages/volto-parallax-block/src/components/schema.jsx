import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions';

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
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  buttonText: {
    id: 'buttonText',
    defaultMessage: 'Button Text',
  },
  showButton: {
    id: 'Show Button',
    defaultMessage: 'Show Button',
  },
  size: {
    id: 'size',
    defaultMessage: 'Image size',
  },
  variation: {
    id: 'variation',
    defaultMessage: 'Variation',
  },
  fontColor: {
    id: 'Font color',
    defaultMessage: 'Font color',
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

export default function ParallaxSchema(props) {
  const { intl } = props;
  let schema = {
    title: intl.formatMessage(messages.parallaxBlock),
    block: 'parallax',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'url',
          'title',
          'text',
          'buttonText',
          'href',
          'openLinkInNewTab',
        ],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      url: {
        title: props.intl.formatMessage(messages.image),
        widget: 'image',
      },
      text: {
        title: intl.formatMessage(messages.text),
        widget: 'textarea',
      },
      buttonText: {
        title: intl.formatMessage(messages.buttonText),
        type: 'string',
        widget: 'textarea',
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

  const variations = [
    {
      id: 'default',
      title: 'Default',
      isDefault: true,
    },
    {
      id: 'outlined-textbox',
      title: 'Outlined textbox',
      isDefault: false,
    },
    {
      id: 'solid-textbox',
      title: 'Solid textbox',
      isDefault: false,
    },
  ];

  schema = addExtensionFieldToSchema({
    schema,
    name: 'variation',
    items: variations,
    intl,
    title: messages.variation,
  });

  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields.push('size');
  schema.properties.styles.schema.properties['size'] = {
    title: intl.formatMessage(messages.size),
    widget: 'size',
    default: 'l',
  };

  schema.properties.styles.schema.fieldsets[0].fields = [
    'showButton',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];

  schema.properties.styles.schema.properties.showButton = {
    title: intl.formatMessage(messages.showButton),
    type: 'boolean',
  };

  schema.properties.styles.schema.fieldsets[0].fields.push('align:noprefix');
  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'blockAlignment',
    title: intl.formatMessage(messages.Alignment),
    default: 'left',
  };

  schema.properties.styles.schema.fieldsets[0].fields.push(
    'themeForegroundColor',
  );
  schema.properties.styles.schema.properties['themeForegroundColor'] = {
    title: intl.formatMessage(messages.fontColor),
    widget: 'color_picker',
    colors: [
      {
        style: {
          '--theme-foreground-color': '#000',
        },
        name: 'custom-foreground-color-1',
        label: 'Black',
      },
      {
        style: {
          '--theme-foreground-color': '#fff',
        },
        name: 'custom-foreground-color-2',
        label: 'White',
      },
    ],
    default: 'black',
  };

  return schema;
}
