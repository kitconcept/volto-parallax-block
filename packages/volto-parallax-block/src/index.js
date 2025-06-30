import ParallaxEdit from './components/Edit';
import ParallaxView from './components/View';
import imageFileListSVG from '@plone/volto/icons/image-fit.svg';

const applyConfig = (config) => {
  config.blocks.blocksConfig.parallax = {
    id: 'parallaxBlock',
    title: 'Parallax Block',
    group: 'teaser',
    view: ParallaxView,
    edit: ParallaxEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };

  return config;
};

export default applyConfig;
