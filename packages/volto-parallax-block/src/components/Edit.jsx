import React from 'react';
import ParallaxView from './View';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import ParallaxData from './Data.jsx';

const ParallaxEdit = (props) => {
  const { data, onChangeBlock, block, selected, blocksConfig } = props;
  return (
    <>
      <ParallaxView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <ParallaxData {...props} />
      </SidebarPortal>
    </>
  );
};

export default ParallaxEdit;
