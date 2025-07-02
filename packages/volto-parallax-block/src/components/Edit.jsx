import React from 'react';
import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import View from './View';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import ParallaxSidebar from './Sidebar.jsx';

const ParallaxEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  const handleChange = React.useCallback(
    async (id, image) => {
      const url = image ? image['@id'] || image : '';

      onChangeBlock(block, {
        ...data,
        url: flattenToAppURL(url),
      });
    },
    [onChangeBlock, block, data],
  );

  return (
    <>
      {data.url ? (
        <View {...props} isEditMode />
      ) : (
        <ImageInput
          onChange={handleChange}
          block={block}
          id={block}
          objectBrowserPickerType={'image'}
        />
      )}
      <SidebarPortal selected={selected}>
        <ParallaxSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default ParallaxEdit;
