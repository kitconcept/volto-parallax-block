import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import type {
  BrowserItem,
  ParallaxDataAdapter,
  ParallaxDataProps,
  ParallaxStoreState,
} from './types';

const ParallaxData = (props: ParallaxDataProps) => {
  const {
    block,
    blocksConfig,
    blocksErrors,
    data,
    onChangeBlock,
    navRoot,
    contentType,
  } = props;
  const intl = useIntl();

  const blockSchema = blocksConfig.parallax.blockSchema;
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ data, intl })
      : blockSchema;
  const dataAdapter = blocksConfig.parallax.dataAdapter as ParallaxDataAdapter;
  const request = useSelector(
    (state: ParallaxStoreState) => state.content.subrequests[block],
  );
  const content = request?.data;

  return (
    <>
      <BlockDataForm
        schema={schema}
        title={schema.title}
        onChangeField={(
          id: string,
          value: string | BrowserItem | null,
          item?: BrowserItem,
        ) => {
          dataAdapter({
            block,
            data,
            id,
            onChangeBlock,
            value,
            content,
            item,
          });
        }}
        onChangeBlock={onChangeBlock}
        formData={data}
        block={block}
        blocksConfig={blocksConfig}
        navRoot={navRoot}
        contentType={contentType}
        errors={blocksErrors}
      />
    </>
  );
};

export default ParallaxData;
