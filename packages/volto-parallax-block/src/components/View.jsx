import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';

const ParallaxView = (props) => {
  const { data, blockConfig } = props;
  const Image = config.getComponent({ name: 'Image' }).component;

  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                transform: `translate(-50%, calc(-50% + ${offsetY * 0.3}px))`,
              }}
            />

            <div className="parallax-text">
              {data.text && <p>{data?.text}</p>}
              {data.additionalText && <p>{data?.additionalText}</p>}
            </div>
          </>
        )}
      </div>
    </BlockWrapper>
  );
};

export default ParallaxView;
