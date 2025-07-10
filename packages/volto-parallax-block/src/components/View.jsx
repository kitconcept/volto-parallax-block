import { useState, useEffect } from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { defineMessages } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';

const messages = defineMessages({
  ButtonText: {
    id: 'Continue Reading',
    defaultMessage: 'Continue Reading',
  },
});

const ParallaxView = (props) => {
  const { data, intl } = props;
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
      <div className={cx('parallax-wrapper', data.BlockHeight)}>
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
                <h2
                  className={cx(
                    'parallax-title',
                    data.Text && 'has-text',
                    data.ButtonText && 'has-ButtonText',
                  )}
                >
                  {data.Title}
                </h2>
              )}
              {data.Text && (
                <div
                  className={cx(
                    'parallax-text',
                    !data.HideButton && 'has-ButtonText',
                  )}
                >
                  {data.Text && <div>{data.Text}</div>}
                </div>
              )}
              {/* {!data.HideButton && (
                <button className="parallax-button">
                  {data.ButtonText || intl.formatMessage(messages.ButtonText)}
                </button>
              )} */}
            </div>
          </>
        )}
      </div>
    </BlockWrapper>
  );
};

export default ParallaxView;
