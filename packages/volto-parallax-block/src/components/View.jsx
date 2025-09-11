import { useState, useRef, useEffect } from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';
import { useSelector } from 'react-redux';
import { ConditionalLink } from '@plone/volto/components/';

const messages = defineMessages({
  buttonText: {
    id: 'continueReading',
    defaultMessage: 'Continue Reading',
  },
});

const LegacyWrapper = (props) => (
  <div className="parallax-wrapper">{props.children}</div>
);

const ParallaxView = (props) => {
  const { block, blocksConfig, data, isEditMode, onChangeBlock } = props;
  const Image = config.getComponent('Image').component;
  const dataAdapter = blocksConfig.parallax.dataAdapter;
  const request = useSelector((state) => state.content.subrequests[block]);
  const content = request?.data;

  const [offsetY, setOffsetY] = useState(0);
  const [hasLink, setHasLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [startScrollY, setStartScrollY] = useState(null);
  const [hasContent, setHasContent] = useState(false);

  const speed = 0.3; // Adjust the speed of the parallax effect
  const maxOffset = 500;
  const translateY = Math.min(offsetY * speed, maxOffset);
  const hasRichText = (value) => {
    if (!value || typeof value.data !== 'string') return false;
    const plain = value.data.replace('<p></p>', '');
    return plain.length > 0;
  };

  useEffect(() => {
    const hasText = hasRichText(data.text);
    const contentExists =
      !!data.title ||
      hasText ||
      data.styles.hideButton ||
      (data.styles.hideButton && !!data.buttonText);

    setHasContent(contentExists);
  }, [data.title, data.text, data.styles.hideButton, data.buttonText]);

  const wrapperRef = useRef(null);
  const intl = useIntl();

  let renderedImage = null;
  if (data.url) {
    if (Image) {
      renderedImage = (
        <Image
          className="parallax-img"
          item={
            data.image_scales
              ? {
                  '@id': data.url,
                  image_field: data.image_field,
                  image_scales: data.image_scales,
                }
              : null
          }
          src={!data.image_scales ? data.url : null}
          alt=""
          loading="lazy"
          responsive={true}
          style={{
            transform: `translate(0, calc(-50% + ${translateY}px))`,
          }}
        />
      );
    } else {
      renderedImage = (
        <img
          className="parallax-img"
          src={
            isInternalURL(data.url['@id'])
              ? `${flattenToAppURL(data.url['@id'])}/@@images/image`
              : data.url['@id']
          }
          alt=""
          loading="lazy"
        />
      );
    }
  }

  useEffect(() => {
    const currentRef = wrapperRef.current;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setStartScrollY((prev) => {
            if (prev === null) {
              return window.scrollY;
            }
            return prev;
          });
          setIsVisible(true);
          obs.disconnect();
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const updateOffset = () => {
      if (isVisible && startScrollY !== null) {
        const distance = window.scrollY - startScrollY;
        setOffsetY(distance > 0 ? distance : 0);
      }
      animationFrameId = requestAnimationFrame(updateOffset);
    };

    animationFrameId = requestAnimationFrame(updateOffset);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, startScrollY]);

  useEffect(() => {
    if (data.href) {
      if (data.href && data.href.length > 0) {
        setHasLink(true);
      }
      if (data.href === 0) {
        setHasLink(false);
      }
    }
  }, [data.href]);

  return (
    <BlockWrapper {...props} ExtraWrapper={LegacyWrapper}>
      <div ref={wrapperRef} className={'parallax-wrapperRef'}>
        {data.url ? (
          <ConditionalLink
            className={'link'}
            to={data.href?.[0]?.['@id']}
            condition={!isEditMode && hasLink}
            openLinkInNewTab={data.openLinkInNewTab}
          >
            {renderedImage}
            <div className="transparencyLayer" />
            <div className="parallax-content">
              <div
                className={cx('box', data.variation, {
                  'has-content': hasContent,
                })}
              >
                {data.title && <h2 className="parallax-title">{data.title}</h2>}
                {hasRichText(data.text) && (
                  <div
                    className="parallax-text"
                    dangerouslySetInnerHTML={{ __html: data.text.data }}
                  />
                )}
                {!data.hideButton && (
                  <button className="parallax-button">
                    {data.buttonText || intl.formatMessage(messages.buttonText)}
                  </button>
                )}
              </div>
            </div>
          </ConditionalLink>
        ) : (
          <ImageInput
            onChange={(id, value, item) => {
              dataAdapter({
                block,
                data,
                id: 'url',
                onChangeBlock,
                value,
                content,
                item,
              });
            }}
            placeholderLinkInput={data.placeholder}
            block={block}
            id={block}
            objectBrowserPickerType={'image'}
          />
        )}
      </div>
    </BlockWrapper>
  );
};

export default ParallaxView;
