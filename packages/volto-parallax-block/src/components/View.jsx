import { useState, useEffect } from 'react';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';
import { useSelector } from 'react-redux';
import { ConditionalLink } from '@plone/volto/components';

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
  const {
    block,
    blocksConfig,
    // className,
    data,
    isEditMode,
    onChangeBlock,
    // style,
  } = props;
  const Image = config.getComponent('Image').component;
  const dataAdapter = blocksConfig.parallax.dataAdapter;
  const request = useSelector((state) => state.content.subrequests[block]);
  const content = request?.data;

  const speed = 0.3; // Adjust the speed of the parallax effect

  const [offsetY, setOffsetY] = useState(0);

  const intl = useIntl();
  // let x = document.getElementsByClassName('parallax-wrapper')[0];
  // console.log(x.offsetTop); ------probably wont use it-------

  let renderedImage = null;
  if (data.url) {
    if (Image) {
      // custom image component expects item summary as src
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
            transform: `translate(0, calc(-50% + ${offsetY * speed}px))`,
          }}
        />
      );
    } else {
      // default img expects string src
      renderedImage = (
        <img
          className="parallax-img"
          src={
            isInternalURL(data.url['@id'])
              ? // Backwards compat in the case that the block is storing the full server URL
                `${flattenToAppURL(data.url['@id'])}/@@images/image`
              : data.url['@id']
          }
          alt=""
          loading="lazy"
        />
      );
    }
  }

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

  let link = data.href && (
    <ConditionalLink
      className={'link'}
      to={data.href[0]?.['@id']}
      condition={data.href && !isEditMode}
      openLinkInNewTab={data.openLinkInNewTab}
    >
      {renderedImage}
      <div className="parallax-content">
        <div className={cx('box', data.variation)}>
          {data.title && <h2 className="parallax-title">{data.title}</h2>}
          {data.text && <div className="parallax-text">{data.text}</div>}
          {!data.hideButton && (
            <button className="parallax-button">
              {data.buttonText || intl.formatMessage(messages.buttonText)}
            </button>
          )}
        </div>
      </div>
    </ConditionalLink>
  );

  return (
    <BlockWrapper {...props} ExtraWrapper={LegacyWrapper} id="ParallaxBlock">
      <>
        {data.url ? (
          <>{link}</>
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
      </>
    </BlockWrapper>
  );
};

export default ParallaxView;
