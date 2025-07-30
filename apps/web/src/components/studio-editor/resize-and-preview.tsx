import {
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from 'react-advanced-cropper';
import {
  FormLayout,
  InlineGrid,
  Select,
  Button,
  Box,
  EmptyState,
  Grid,
  InlineStack,
} from '@shopify/polaris';
import { useRef, useCallback } from 'react';
import { XIcon, SaveIcon, ReplaceIcon } from '@shopify/polaris-icons';

import 'react-advanced-cropper/dist/style.css';
import 'react-advanced-cropper/dist/themes/compact.css';

import { AppCard } from '@src/components/app-card';

import { useEditorStore } from '@src/store/editor';

import { resizeImage } from '@src/lib/api/image-service';
import {
  getSocialPlatformById,
  getSocialPlatformSelectOptions,
  getSocialPlatformDimensionSelectOptions,
  getSocialPlatformDimensionById,
} from '@src/lib/utils/social-platform';

export function ResizeAndPreview() {
  const cropperRef = useRef<FixedCropperRef>(null);

  const {
    setError,
    selectedImage,
    previewImage,
    setPreviewImage,
    selectedSocialPlatform,
    setSelectedSocialPlatform,
    selectedSocialPlatformDimension,
    setSelectedSocialPlatformDimension,
  } = useEditorStore();

  const onPlatformSelected = useCallback(
    (socialPlatformId: string) =>
      setSelectedSocialPlatform(getSocialPlatformById(socialPlatformId)),
    [setSelectedSocialPlatform]
  );

  const onDimensionSelected = useCallback(
    (dimensionId: string) =>
      setSelectedSocialPlatformDimension(
        getSocialPlatformDimensionById(dimensionId)
      ),
    [setSelectedSocialPlatformDimension]
  );

  const onResizeImageClicked = () => {
    if (!selectedImage) {
      return setError('You should select image to resize!');
    }

    if (!selectedSocialPlatform) {
      return setError('You should select platform to resize!');
    }

    if (!selectedSocialPlatformDimension) {
      return setError('You should select dimension to resize!');
    }

    const canvas = cropperRef.current?.getCanvas();
    if (!canvas) {
      return setError('Image resizing error!');
    }

    return canvas.toBlob((blob) => {
      if (!blob) {
        return setError('Image resizing error!');
      }

      const form = new FormData();
      form.append('file', blob);
      form.append('id', selectedImage.id);
      form.append('platform', selectedSocialPlatform?.id);
      form.append('dimension', selectedSocialPlatformDimension?.id);
      form.append('width', selectedSocialPlatformDimension.width.toString());
      form.append('height', selectedSocialPlatformDimension.height.toString());

      resizeImage(form as unknown as ResizeImagePayload)
        .then(({ data }) => setPreviewImage(data))
        .catch(() => setError('An error occurred while resizing image!'));
    }, 'image/jpeg');
  };

  const onDownloadClicked = () => {
    if (!previewImage) {
      return setError('Something went wrong!');
    }

    const fileName = previewImage.url.split('/').pop();

    const link = document.createElement('a');
    link.href = previewImage.url;
    link.download = fileName || 'download.png'; // Fallback name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSetNewClicked = () => {
    // TODO: Not implemented
  };

  return (
    <AppCard>
      {previewImage && (
        <>
          <Box
            overflowX={'hidden'}
            overflowY={'hidden'}
            position={'relative'}
            borderStartEndRadius={'200'}
            borderStartStartRadius={'200'}
            minHeight={'calc(100vh - 32rem)'}
            background={'bg-surface-secondary'}
          >
            <img
              alt={previewImage.id}
              src={previewImage.url}
              style={{
                width: '100%',
                height: 'calc(100vh - 32rem)',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box
            padding={'400'}
            borderEndEndRadius={'200'}
            borderEndStartRadius={'200'}
            background={'bg-surface-brand'}
          >
            <FormLayout>
              <Grid columns={{ lg: 3 }}>
                <Grid.Cell columnSpan={{ sm: 2 }}>
                  <InlineStack gap={'400'}>
                    <Button
                      size={'medium'}
                      icon={ReplaceIcon}
                      variant={'primary'}
                      onClick={onSetNewClicked}
                    >
                      {'Set New'}
                    </Button>

                    <Button
                      icon={SaveIcon}
                      size={'medium'}
                      variant={'secondary'}
                      onClick={onDownloadClicked}
                    >
                      {'Download'}
                    </Button>
                  </InlineStack>
                </Grid.Cell>
                <Grid.Cell>
                  <InlineStack direction={'row-reverse'}>
                    <Button
                      icon={XIcon}
                      size={'medium'}
                      variant={'secondary'}
                      onClick={() => setPreviewImage(undefined)}
                    >
                      {'Close'}
                    </Button>
                  </InlineStack>
                </Grid.Cell>
              </Grid>
            </FormLayout>
          </Box>
        </>
      )}

      {!previewImage && (
        <>
          <Box
            overflowX={'hidden'}
            overflowY={'hidden'}
            position={'relative'}
            borderStartEndRadius={'200'}
            borderStartStartRadius={'200'}
            minHeight={'calc(100vh - 32rem)'}
            background={'bg-surface-secondary'}
          >
            {!previewImage && !selectedSocialPlatformDimension && (
              <EmptyState
                heading={'Ready to resize'}
                image={
                  'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
                }
              >
                {!selectedImage?.id && 'Please select image on left pane'}
                {!!selectedImage?.id &&
                  'Please select platform and dimension on bottom pane'}
              </EmptyState>
            )}

            {!previewImage && selectedSocialPlatformDimension && (
              <FixedCropper
                ref={cropperRef}
                src={selectedImage?.preview?.image?.url}
                style={{ height: 'calc(100vh - 32rem)' }}
                imageRestriction={ImageRestriction.stencil}
                stencilProps={{
                  lines: false,
                  movable: false,
                  handlers: false,
                  resizable: false,
                }}
                stencilSize={{
                  width: selectedSocialPlatformDimension?.width ?? 2000,
                  height: selectedSocialPlatformDimension?.height ?? 2000,
                }}
              />
            )}
          </Box>

          <Box
            padding={'400'}
            borderEndEndRadius={'200'}
            borderEndStartRadius={'200'}
            background={'bg-surface-brand'}
          >
            <FormLayout>
              <InlineGrid columns={3} gap={'500'}>
                <Select
                  label={''}
                  value={selectedSocialPlatform?.id}
                  disabled={!selectedImage?.id}
                  onChange={onPlatformSelected}
                  options={getSocialPlatformSelectOptions()}
                />
                <Select
                  label={''}
                  value={selectedSocialPlatformDimension?.id}
                  onChange={onDimensionSelected}
                  disabled={!selectedSocialPlatform?.id}
                  options={getSocialPlatformDimensionSelectOptions(
                    selectedSocialPlatform?.id
                  )}
                />
                <Button
                  size={'medium'}
                  variant={'primary'}
                  onClick={onResizeImageClicked}
                  disabled={!selectedSocialPlatformDimension?.id}
                >
                  {'Resize It!'}
                </Button>
              </InlineGrid>
            </FormLayout>
          </Box>
        </>
      )}
    </AppCard>
  );
}
