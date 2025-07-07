import { useState, useEffect } from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';

const ParallaxView = (props) => {
  const { data } = props;
  const Image = config.getComponent({ name: 'Image' }).component;
  const blockConfig = config.blocks.blocksConfig.parallax;

  const speedMap = {
    slow: 0.15,
    medium: 0.3,
    fast: 0.45,
  };

  const speed = blockConfig.hasFixedSpeed
    ? speedMap.medium
    : blockConfig.speedMap?.[data.parallaxSpeed] ||
      speedMap[data.parallaxSpeed];

  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let lastScrollY = window.scrollY;

    const updateOffset = () => {
      const currentScrollY = window.scrollY;
      lastScrollY += currentScrollY - lastScrollY;

      setOffsetY(lastScrollY);
      animationFrameId = requestAnimationFrame(updateOffset);
    };

    animationFrameId = requestAnimationFrame(updateOffset);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <BlockWrapper {...props}>
      <div className="parallax-wrapper">
        {data.url && (
          <>
            <Image
              src={`${flattenToAppURL(data.url)}/@@images/image`}
              className="parallax-image"
              style={{
                transform: `translate(-50%, calc(-50% + ${offsetY * speed}px))`,
              }}
            />

            <h2 className="parallax-title">{data.parallaxTitle}</h2>
            <div className="parallax-text">
              {data.text && (
                <div>
                  <>{data.text}</>
                </div>
              )}
              {data.additionalText && <p>{data?.additionalText}</p>}
            </div>
          </>
        )}
      </div>
    </BlockWrapper>
  );
};

export default ParallaxView;
