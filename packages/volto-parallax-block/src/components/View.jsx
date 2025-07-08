import { useState, useEffect } from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import cx from 'classnames';
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
    : blockConfig.speedMap?.[data.Speed] || speedMap[data.Speed];

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

            <div className={cx('parallax-content', data.Align)}>
              {data.Title && (
                <h2 className={cx('parallax-title', data.Text && 'has-text')}>
                  {data.Title}
                </h2>
              )}
              <div className="parallax-text">
                {data.Text && <div>{data.Text}</div>}
              </div>
            </div>
          </>
        )}
      </div>
    </BlockWrapper>
  );
};

export default ParallaxView;
