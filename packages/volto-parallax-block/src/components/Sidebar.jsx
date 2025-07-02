import React from 'react';
import { useIntl, FormattedMessage, defineMessages } from 'react-intl';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { ParallaxSchema } from './schema';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import imageSVG from '@plone/volto/icons/image.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  preview: {
    id: 'image_block_preview',
    defaultMessage: 'Image preview',
  },
  clear: {
    id: 'image_block_clear',
    defaultMessage: 'Clear image',
  },
});

const ParallaxSidebar = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();
  console.log(data.url);

  return (
    <>
      <header
        className="header pulled"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2 style={{ margin: 0 }}>
          {intl.formatMessage({
            id: 'Parallax Block',
            defaultMessage: 'Parallax Block',
          })}
        </h2>

        {data.url && (
          <button
            onClick={() => {
              onChangeBlock(block, {
                ...data,
                url: null,
              });
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
            title={intl.formatMessage({
              id: 'Delete image',
              defaultMessage: 'Delete image',
            })}
          >
            <Icon name={trashSVG} size="24px" color="red" />
          </button>
        )}
      </header>

      <div
        className="sidebar-metadata-container image-sidebar"
        secondary
        attached
      >
        {data.url ? (
          <>
            <div>{(data.url['@id'] ?? data.url).split('/').slice(-1)[0]}</div>
            <Image
              item={
                data.image_scales
                  ? {
                      '@id': data.url,
                      image_field: data.image_field,
                      image_scales: data.image_scales,
                    }
                  : undefined
              }
              src={
                data.image_scales
                  ? undefined
                  : isInternalURL(data.url)
                    ? // Backwards compat in the case that the block is storing the full server URL
                      `${flattenToAppURL(data.url)}/@@images/image/preview`
                    : data.url
              }
              sizes="188px"
              alt={intl.formatMessage(messages.preview)}
              loading="lazy"
              responsive={true}
              style={{ width: '50%' }}
            />
          </>
        ) : (
          <>
            <div className="ui segment">
              <div className="ui message info">
                <div className="header">
                  {intl.formatMessage({
                    id: 'No image selected',
                    defaultMessage: 'No image selected',
                  })}
                </div>
                <Icon name={imageSVG} size="100px" color="#b8c6c8" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="sidebar-metadata-container">
        {data.url ? (
          <>
            <BlockDataForm
              schema={ParallaxSchema({ ...props, intl })}
              title={ParallaxSchema({ ...props, intl }).title}
              onChangeField={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
              formData={data}
              block={block}
            />
          </>
        ) : (
          <FormattedMessage
            id="Select an image to configure the parallax block"
            defaultMessage="Select an image to configure the parallax block"
          />
        )}
      </div>
    </>
  );
};

export default ParallaxSidebar;
