import ParallaxEdit from './components/Edit';
import ParallaxView from './components/View';
import imageFileListSVG from '@plone/volto/icons/image-fit.svg';
import { ParallaxBlockDataAdapter } from './components/adapter';
import ParallaxSchema from './components/schema';

const applyConfig = (config) => {
  config.blocks.blocksConfig.parallax = {
    id: 'parallax',
    icon: imageFileListSVG,
    title: 'Parallax',
    group: 'common',
    view: ParallaxView,
    edit: ParallaxEdit,
    blockSchema: ParallaxSchema,
    dataAdapter: ParallaxBlockDataAdapter,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    themes: [
      {
        style: {
          '--theme-foreground-color': '#000',
          '--theme-color': '#000',
        },
        name: 'custom-foreground-color-1',
        label: 'Black',
      },
      {
        style: {
          '--theme-foreground-color': '#fff',
          '--theme-color': '#fff',
        },
        name: 'custom-foreground-color-2',
        label: 'White',
      },
    ],
  };

  return config;
};

export default applyConfig;
