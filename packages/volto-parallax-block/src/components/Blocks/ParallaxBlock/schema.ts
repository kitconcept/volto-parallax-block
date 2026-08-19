import type { ConfigType } from '@plone/registry';
import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions';
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

const colors = [
  {
    style: {
      '--theme-foreground-color': '#000',
      '--overlay-color': 'rgba(255, 255, 255, 0.66)',
    },
    name: 'black',
    label: 'Black',
  },
  {
    style: {
      '--theme-foreground-color': '#fff',
      '--overlay-color': 'rgba(0, 0, 0, 0.33)',
    },
    name: 'white',
    label: 'White',
  },
];
config.registerUtility({
  name: 'colors',
  type: 'styleFieldDefinition',
  method: (props: { data: any; container: any }) => colors,
});

export default function ParallaxSchema(props: ConfigType) {
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
          'description',
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
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'richtext',
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

  const overlays = [
    {
      id: 'full_overlay',
      title: 'Full Overlay',
      isDefault: true,
    },
    {
      id: 'solid-textbox',
      title: 'Textbox',
      isDefault: false,
    },
  ];

  schema = addExtensionFieldToSchema({
    schema,
    name: 'overlay',
    items: overlays,
    intl,
    title: messages.overlay,
  });

  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields.push('size');
  schema.properties.styles.schema.properties['size'] = {
    title: intl.formatMessage(messages.size),
    widget: 'size',
    default: 'm',
  };

  schema.properties.styles.schema.fieldsets[0].fields = [
    'hideButton',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];

  schema.properties.styles.schema.properties.hideButton = {
    title: intl.formatMessage(messages.hideButton),
    type: 'boolean',
  };

  schema.properties.styles.schema.fieldsets[0].fields.push('align:noprefix');
  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'align',
    actions: ['left', 'center', 'right'],
    title: intl.formatMessage(messages.Alignment),
    default: 'left',
  };

  schema.properties.styles.schema.fieldsets[0].fields.push('colors');
  schema.properties.styles.schema.properties.colors = {
    title: intl.formatMessage(messages.fontColor),
    widget: 'color_picker',
    default: 'black',
    colors: colors,
  };

  return schema;
}
