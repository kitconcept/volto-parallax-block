import imageFileListSVG from '@plone/volto/icons/image-fit.svg';
import ParallaxBlockView from './View';
import ParallaxBlockEdit from './Edit';
import ParallaxSchema from './schema';
import { ParallaxBlockDataAdapter } from './adapter';
import type { BlockConfigBase } from '@plone/types';

const ParallaxBlockInfo: BlockConfigBase = {
  id: 'parallax',
  icon: imageFileListSVG,
  title: 'Parallax',
  group: 'common',
  view: ParallaxBlockView,
  edit: ParallaxBlockEdit,
  blockSchema: ParallaxSchema,
  dataAdapter: ParallaxBlockDataAdapter,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,
  themes: [
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
  ],
};

export default ParallaxBlockInfo;
