import ParallaxEdit from './components/Edit';
import ParallaxView from './components/View';
import imageFileListSVG from '@plone/volto/icons/image-fit.svg';
import './theme/main.scss';

const FONT_COLORS = [
  { name: 'parallax-font-black', label: 'black' },
  { name: 'parallax-font-white', label: 'white' },
];

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
    fontColors: FONT_COLORS,
  };

  return config;
};

export default applyConfig;
