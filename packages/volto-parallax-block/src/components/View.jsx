import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax'; //
import { createContent } from '@plone/volto/actions/content/content'; //
import { readAsDataURL } from 'promise-file-reader';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react'; //
import { Icon } from '@plone/volto/components/theme/Icon/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { usePrevious } from '@kitconcept/volto-blocks/helpers'; //
import {
  flattenToAppURL,
  getBaseUrl,
  isInternalURL,
} from '@plone/volto/helpers/Url/Url';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id: 'Browse the site, drop an image, or type an URL',
    defaultMessage: 'Browse the site, drop an image, or type an URL',
  },
});

const ParallaxView = ({ data, ...props }) => {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  const placeholder = intl.formatMessage(messages.ImageBlockInputPlaceholder);
  let loading = '';
  const fontColor = data?.fontColor ?? '#fff';

  const request = useSelector(
    (state) => state.content.subrequests[props.block],
  );
  const content = useSelector(
    (state) => state.content.subrequests[props.block]?.data,
  );

  const alt = props.properties.title;
  const urlUploaded = content ? content['@id'] : null;

  // copy variable name for the useEffect dependency
  const onChangeBlockCopy = props.onChangeBlock;
  const blockCopy = props.block;
  const requestLoaded = request ? request.loaded : null;

  useEffect(() => {
    if (loading) {
      if (loading && requestLoaded && uploading) {
        setUploading(false);
        onChangeBlockCopy(blockCopy, {
          ...data,
          url: urlUploaded,
          alt: alt,
        });
      }
    }
  }, [
    requestLoaded,
    loading,
    uploading,
    urlUploaded,
    dispatch,
    alt,
    onChangeBlockCopy,
    blockCopy,
    data,
  ]);

  loading = usePrevious(request?.loading);

  /**
   * Upload image handler
   * not powered by react-dropzone
   * @method onUploadImage
   * @returns {undefined}
   */
  const onUploadImage = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    setUploading(true);
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(
          getBaseUrl(props.pathname),
          {
            '@type': 'Image',
            title: file.name,
            image: {
              data: fields[3],
              encoding: fields[2],
              'content-type': fields[1],
              filename: file.name,
            },
          },
          props.block,
        ),
      );
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @param {object} e Event
   * @returns {undefined}
   */
  const onSubmitUrl = () => {
    props.onChangeBlock(props.block, {
      ...data,
      url: props.url,
    });
  };

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (file) => {
    setUploading(true);
    readAsDataURL(file[0]).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(
          getBaseUrl(props.pathname),
          {
            '@type': 'Image',
            title: file[0].name,
            image: {
              data: fields[3],
              encoding: fields[2],
              'content-type': fields[1],
              filename: file[0].name,
            },
          },
          props.block,
        ),
      );
    });
  };

  const onDragEnter = () => {
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  const onKeyDownVariantMenuForm = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmitUrl();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  return (
    <>
      <div className="parallax-view">
        {data.url ? (
          <Parallax
            bgImage={
              data.url
                ? isInternalURL(data.url)
                  ? `${flattenToAppURL(data.url)}/@@images/image/huge`
                  : data.url
                : imageBlockSVG
            }
            bgImageAlt=""
            strength={500}
          >
            <div className="content" style={{ '--font-color': fontColor }}>
              <h2 className="text">{data.text}</h2>
            </div>
          </Parallax>
        ) : (
          <div>
            {props.isEditMode && (
              <Dropzone
                noClick
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                className="dropzone"
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <Message>
                      {dragging && <Dimmer active></Dimmer>}
                      {uploading && (
                        <Dimmer active>
                          <Loader indeterminate>Uploading image</Loader>
                        </Dimmer>
                      )}
                      <div className="no-image-wrapper">
                        <img
                          className="placeholder-image"
                          src={imageBlockSVG}
                          alt=""
                        />
                        <div className="toolbar-inner">
                          <Button.Group>
                            <Button
                              basic
                              icon
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                props.openObjectBrowser();
                              }}
                            >
                              <Icon name={navTreeSVG} size="24px" />
                            </Button>
                          </Button.Group>
                          <Button.Group>
                            <label className="ui button basic icon">
                              <Icon name={uploadSVG} size="24px" />
                              <input
                                {...getInputProps({
                                  type: 'file',
                                  onChange: onUploadImage,
                                  style: { display: 'none' },
                                })}
                              />
                            </label>
                          </Button.Group>
                          <Input
                            onKeyDown={onKeyDownVariantMenuForm}
                            onChange={props.onChangeUrl}
                            placeholder={placeholder}
                            value={props.url}
                            onClick={(e) => {
                              e.target.focus();
                            }}
                            onFocus={(e) => {
                              props.onSelectBlock(props.id);
                            }}
                          />
                          {props.url && (
                            <Button.Group>
                              <Button
                                basic
                                className="cancel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  props.resetSubmitUrl();
                                }}
                              >
                                <Icon name={clearSVG} size="30px" />
                              </Button>
                            </Button.Group>
                          )}
                          <Button.Group>
                            <Button
                              basic
                              primary
                              disabled={!props.url}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSubmitUrl();
                              }}
                            >
                              <Icon name={aheadSVG} size="30px" />
                            </Button>
                          </Button.Group>
                        </div>
                      </div>
                    </Message>
                  </div>
                )}
              </Dropzone>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ParallaxView;
