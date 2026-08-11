import type {
  BlockEditProps,
  BlocksFormData,
  BlockViewProps,
  Content,
} from '@plone/types';

/**
 * A value produced by the `richtext` widget.
 */
export interface RichTextValue {
  data: string;
  'content-type'?: string;
  encoding?: string;
}

/**
 * An item as returned by the object browser or the image widget.
 */
export interface BrowserItem {
  '@id': string;
  image_field?: string;
  image_scales?: ImageScales;
  [key: string]: unknown;
}

export type ImageScales = Record<string, unknown[]>;

/**
 * The `styles` sub-schema contributed by `addStyling` plus the fields this
 * block adds to it in `schema.ts`.
 */
export interface ParallaxStyles {
  hideButton?: boolean;
  size?: string;
  colors?: string;
  'align:noprefix'?: string;
  [key: string]: unknown;
}

/**
 * The block data as stored on the content object.
 */
export interface ParallaxBlockData extends BlocksFormData {
  /**
   * Normalized to a string by the data adapter, but content created before
   * the adapter existed may still hold the raw object browser item.
   */
  url?: string | BrowserItem;
  image_field?: string;
  image_scales?: ImageScales;
  title?: string;
  description?: RichTextValue;
  buttonText?: string;
  href?: BrowserItem[];
  openLinkInNewTab?: boolean;
  overlay?: string;
  placeholder?: string;
  styles?: ParallaxStyles;
  hideButton?: boolean;
  size?: String;
  align?: String;
  colors?: String;
}

/**
 * The slice of the Redux store this block reads.
 */
export interface ParallaxStoreState {
  content: {
    subrequests: Record<string, { data?: Content } | undefined>;
  };
}

/**
 * The `dataAdapter` signature used by this block. It widens the base one from
 * `@plone/types` with the `content` and `item` arguments the image widget
 * hands over on change.
 */
export type ParallaxDataAdapter = (args: {
  block: string;
  data: ParallaxBlockData;
  id: string;
  onChangeBlock: BlockEditProps['onChangeBlock'];
  value: string | BrowserItem | null;
  content?: Content;
  item?: BrowserItem;
}) => void;

export interface ParallaxViewProps extends Omit<BlockViewProps, 'data'> {
  data: ParallaxBlockData;
  /**
   * Only handed over in edit mode, where it keys the image upload subrequest.
   */
  block?: string;
  isEditMode?: boolean;
  onChangeBlock?: BlockEditProps['onChangeBlock'];
}

export interface ParallaxEditProps extends Omit<BlockEditProps, 'data'> {
  data: ParallaxBlockData;
}

export type ParallaxDataProps = Pick<
  ParallaxEditProps,
  | 'block'
  | 'blocksConfig'
  | 'blocksErrors'
  | 'data'
  | 'onChangeBlock'
  | 'navRoot'
  | 'contentType'
>;
