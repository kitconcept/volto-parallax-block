import { useState, useEffect } from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';

const messages = defineMessages({
  buttonText: {
    id: 'continueReading',
    defaultMessage: 'Continue Reading',
  },
});

const ParallaxView = (props) => {
  const { data } = props;
  const Image = config.getComponent({ name: 'Image' }).component;

  const speed = 0.3; // Adjust the speed of the parallax effect

  const [offsetY, setOffsetY] = useState(0);

  const intl = useIntl();

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
      <div className={cx('parallax-wrapper', data.size)}>
        {data.url && (
          <>
            <Image
              src={`${flattenToAppURL(data.url)}/@@images/image`}
              className="parallax-image"
              style={{
                transform: `translate(-50%, calc(-50% + ${offsetY * speed}px))`,
              }}
            />

            <div className={cx('parallax-content', data.align, data.fontColor)}>
              {data.title && (
                <h2
                  className={cx(
                    'parallax-title',
                    data.text && 'has-text',
                    data.buttonText && 'has-ButtonText',
                    !data.hideButton && 'has-hideButton',
                  )}
                >
                  {data.title}
                </h2>
              )}
              {data.text && (
                <div
                  className={cx(
                    'parallax-text',
                    !data.hideButton && 'has-ButtonText',
                  )}
                >
                  {data.text && <div>{data.text}</div>}
                </div>
              )}
              {!data.hideButton && (
                <button
                  className={cx('parallax-button', data.fontColor)}
                  // style={{
                  //   color: data.fontColor || 'white',
                  //   border: `1px solid ${data.fontColor || 'white'}`,
                  // }}
                >
                  {data.buttonText || intl.formatMessage(messages.buttonText)}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </BlockWrapper>
  );
};

export default ParallaxView;
