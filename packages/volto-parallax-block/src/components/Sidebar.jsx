import React from 'react';
import { useIntl } from 'react-intl';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { ParallaxSchema } from './schema';
import { Icon } from '@plone/volto/components/theme/Icon/Icon';
import imageSVG from '@plone/volto/icons/image.svg';

const ParallaxSidebar = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();

  return (
    <>
      {props.data.url ? (
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
      ) : (
        <>
          <div>
            <header className="header pulled">
              <h2>
                {intl.formatMessage({
                  id: 'Parallax Block',
                  defaultMessage: 'Parallax Block',
                })}
              </h2>
            </header>
            <div className="sidebar-metadata-container">
              {intl.formatMessage({
                id: 'No image selected',
                defaultMessage: 'No image selected',
              })}

              <Icon name={imageSVG} size="100px" color="#b8c6c8" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ParallaxSidebar;
