import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';

// Parallax Block
import ParallaxBlockInfo from '@kitconcept/volto-parallax-block/components/Blocks/ParallaxBlock';

declare module '@plone/types' {
  export interface BlocksConfigData {
    parallax: BlockConfigBase;
    playerBlock: BlockConfigBase;
  }
}

export default function install(config: ConfigType) {
  // Blocks
  config.blocks.blocksConfig.parallax = ParallaxBlockInfo;

  config.registerUtility({
    name: 'colors',
    type: 'styleFieldDefinition',
    method: (props: any) => ParallaxBlockInfo.themes,
  });

  return config;
}
