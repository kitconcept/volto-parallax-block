import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';
import installConfigParallax from './components/Blocks/ParallaxBlock';

function applyConfig(config: ConfigType) {
  installSettings(config);
  installConfigParallax(config);

  return config;
}

export default applyConfig;
