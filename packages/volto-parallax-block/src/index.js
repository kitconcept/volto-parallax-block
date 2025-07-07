import ParallaxEdit from './components/Edit';
import ParallaxView from './components/View';
import imageFileListSVG from '@plone/volto/icons/image-fit.svg';
import './theme/main.scss';

const applyConfig = (config) => {
  config.blocks.blocksConfig.parallax = {
    id: 'parallax',
    icon: imageFileListSVG,
    title: 'Parallax',
    group: 'common',
    view: ParallaxView,
    edit: ParallaxEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    hasFixedSpeed: false, //Set to true if you want a fixed speed for the parallex effect
  };

  return config;
};

export default applyConfig;
