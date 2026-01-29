import ParallaxEdit from './components/Edit';
import ParallaxView from './components/View';
import imageFileListSVG from '@plone/volto/icons/image-fit.svg';
import { ParallaxBlockDataAdapter } from './components/adapter';
import { ParallaxSchema, ParallaxSchemaEnhancer } from './components/schema';

const applyConfig = (config) => {
  config.blocks.blocksConfig.parallax = {
    id: 'parallax',
    icon: imageFileListSVG,
    title: 'Parallax',
    group: 'common',
    view: ParallaxView,
    edit: ParallaxEdit,
    dataAdapter: ParallaxBlockDataAdapter,
    blockSchema: ParallaxSchema,
    schemaEnhancer: ParallaxSchemaEnhancer,
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
  config.registerUtility({
    name: 'colors',
    type: 'styleFieldDefinition',
    method: (props) => config.blocks.blocksConfig.parallax.themes,
  });

  return config;
};

export default applyConfig;
