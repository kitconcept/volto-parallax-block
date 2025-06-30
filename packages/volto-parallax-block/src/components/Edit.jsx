import React, { useState } from 'react';
import View from './View';
import { SidebarPortal } from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import ParallaxSidebar from './Sidebar.jsx';

const ParallaxEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  const [url, setUrl] = useState('');
  const resetSubmitUrl = () => {
    setUrl('');
  };

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  return (
    <>
      <View
        {...props}
        url={url}
        onChangeUrl={onChangeUrl}
        resetSubmitUrl={resetSubmitUrl}
        isEditMode
      />
      <SidebarPortal selected={selected}>
        <ParallaxSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          resetSubmitUrl={resetSubmitUrl}
        />
      </SidebarPortal>
    </>
  );
};

export default ParallaxEdit;
