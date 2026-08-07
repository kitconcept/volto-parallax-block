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
  <div className="parallax-wrapper" ref={props.wrapperElRef}>
    {props.children}
  </div>
);

const ParallaxView = (props) => {
  const { block, blocksConfig, data, isEditMode, onChangeBlock } = props;
  const Image = config.getComponent('Image').component;
  const dataAdapter = blocksConfig.parallax.dataAdapter;
  const request = useSelector((state) => state.content.subrequests[block]);
  const content = request?.data;
  const wrapperRef = useRef(null);
  const intl = useIntl();

  const [offsetY, setOffsetY] = useState(0);
  const [hasLink, setHasLink] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const speed = 0.2; // Adjust the speed of the parallax effect
  const maxOffset = 500;
  const translateY = Math.min(offsetY * speed, maxOffset);
  const hasRichText = (value) => {
    if (!value || typeof value.data !== 'string') return false;
    const plain = value.data.replace('<p></p>', '');
    return plain.length > 0;
  };

  useEffect(() => {
    const hasText = hasRichText(data.description);
    const contentExists =
      !!data.title ||
      hasText ||
      !data.styles.hideButton ||
      (!data.styles.hideButton && !!data.buttonText);

    setHasContent(contentExists);
  }, [data.title, data.description, data.styles.hideButton, data.buttonText]);

  useEffect(() => {
    setHasLink(!!(data.href && data.href.length > 0));
  }, [data.href]);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) setOffsetY(Math.max(0, -rect.top + window.innerHeight));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(measure);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
        <Image
          className="parallax-img"
          src={
            isInternalURL(data.url['@id'])
              ? `${flattenToAppURL(data.url['@id'])}/@@images/image`
              : data.url['@id']
          }
          alt="Background image from parallax block"
        />
      );
    }
  }

  if (!isEditMode && !data.url) return null;

  return (
    <BlockWrapper
      {...props}
      ExtraWrapper={LegacyWrapper}
      wrapperElRef={wrapperRef}
      data={{ ...props.data, align: 'full' }}
    >
      <div className={'parallax-wrapperRef'}>
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
                className={cx('box', data.overlay, {
                  'has-content': hasContent,
                })}
              >
                {data.title && <h2 className="parallax-title">{data.title}</h2>}
                {hasRichText(data.description) && (
                  <div
                    className="parallax-description"
                    dangerouslySetInnerHTML={{ __html: data.description.data }}
                  />
                )}
                {!data.styles.hideButton && (
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
