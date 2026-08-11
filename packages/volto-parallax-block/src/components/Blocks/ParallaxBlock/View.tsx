import { useState, useRef, useEffect } from 'react';
import type {
  ComponentProps,
  ComponentType,
  ReactNode,
  RefObject,
} from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';
import { useSelector } from 'react-redux';
import { ConditionalLink } from '@plone/volto/components/';
import type {
  BrowserItem,
  ParallaxDataAdapter,
  ParallaxStoreState,
  ParallaxViewProps,
  RichTextValue,
} from './types';

const messages = defineMessages({
  buttonText: {
    id: 'continueReading',
    defaultMessage: 'Continue Reading',
  },
});

const LegacyWrapper = (props: {
  children: ReactNode;
  wrapperElRef: RefObject<HTMLDivElement>;
}) => (
  <div className="parallax-wrapper" ref={props.wrapperElRef}>
    {props.children}
  </div>
);

// `BlockWrapper` forwards every extra prop it receives down to `ExtraWrapper`,
// but its prop type does not declare that. Widen it locally until
// `@kitconcept/volto-bm3-compat` types the pass-through.
const ParallaxBlockWrapper = BlockWrapper as ComponentType<
  ComponentProps<typeof BlockWrapper> & {
    wrapperElRef: RefObject<HTMLDivElement>;
  }
>;

const ParallaxView = (props: ParallaxViewProps) => {
  const { block, blocksConfig, data, isEditMode, onChangeBlock } = props;
  const Image = config.getComponent('Image').component;
  const dataAdapter = blocksConfig.parallax.dataAdapter as ParallaxDataAdapter;
  const request = useSelector(
    (state: ParallaxStoreState) => state.content.subrequests[block],
  );
  const content = request?.data;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  const [offsetY, setOffsetY] = useState(0);
  const [hasLink, setHasLink] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const speed = 0.2; // Adjust the speed of the parallax effect
  const maxOffset = 500;
  const translateY = Math.min(offsetY * speed, maxOffset);
  const hasRichText = (value?: RichTextValue) => {
    if (!value || typeof value.data !== 'string') return false;
    const plain = value.data.replace('<p></p>', '');
    return plain.length > 0;
  };
  console.log(config);
  // `url` holds a plain string once it went through the data adapter, but
  // older content may still carry the object browser item.
  const imageUrl =
    typeof data.url === 'string' ? data.url : (data.url?.['@id'] as string);

  useEffect(() => {
    const hasText = hasRichText(data.description);
    const contentExists =
      !!data.title ||
      hasText ||
      !data.styles?.hideButton ||
      (!data.styles?.hideButton && !!data.buttonText);

    setHasContent(contentExists);
  }, [data.title, data.description, data.styles?.hideButton, data.buttonText]);

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

  let renderedImage: ReactNode = null;
  if (data.url) {
    if (Image) {
      renderedImage = (
        <Image
          className="parallax-img"
          item={
            data.image_scales
              ? {
                  '@id': imageUrl,
                  image_field: data.image_field,
                  image_scales: data.image_scales,
                }
              : null
          }
          src={!data.image_scales ? imageUrl : null}
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
            isInternalURL(imageUrl)
              ? `${flattenToAppURL(imageUrl)}/@@images/image`
              : imageUrl
          }
          alt="Background image from parallax block"
        />
      );
    }
  }

  if (!isEditMode && !data.url) return null;

  return (
    <ParallaxBlockWrapper
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
                {!data.styles?.hideButton && (
                  <button className="parallax-button">
                    {data.buttonText || intl.formatMessage(messages.buttonText)}
                  </button>
                )}
              </div>
            </div>
          </ConditionalLink>
        ) : (
          <ImageInput
            onChange={(
              id: string,
              value: string | BrowserItem | null,
              item?: BrowserItem,
            ) => {
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
    </ParallaxBlockWrapper>
  );
};

export default ParallaxView;
