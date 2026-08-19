import ParallaxView from './View';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import ParallaxData from './Data';
import type { ParallaxEditProps } from './types';

const ParallaxEdit = (props: ParallaxEditProps) => {
  const { selected } = props;
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
