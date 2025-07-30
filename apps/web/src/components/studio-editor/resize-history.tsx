import {
  Text,
  BlockStack,
  Bleed,
  Box,
  Thumbnail,
  Scrollable,
  InlineStack,
} from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { CheckIcon } from '@shopify/polaris-icons';

import { AppCard } from '@src/components/app-card';
import { Backdrop } from '@src/components/backdrop';

import { useEditorStore } from '@src/store/editor';

import { getResizeHistory } from '@src/lib/api/image-service';

export function ResizeHistory() {
  const { setError, selectedImage, previewImage, setPreviewImage } =
    useEditorStore();

  const [resizeHistory, setResizeHistory] =
    useState<GetResizeHistoryResponse>();

  useEffect(() => {
    if (selectedImage?.id) {
      getResizeHistory({ id: selectedImage.id })
        .then(({ data }) => setResizeHistory(data))
        .catch(() =>
          setError('An error occurred while fetching resize history.')
        );
    }
  }, [selectedImage?.id, setError, previewImage]);

  return (
    <AppCard style={{ opacity: !selectedImage?.id ? 0.1 : 1 }}>
      <BlockStack gap={'500'}>
        <Bleed marginInline={'400'} marginBlockStart={'400'}>
          <Box
            padding={'400'}
            borderBlockEndWidth={'025'}
            borderColor={'border-tertiary'}
            background={'bg-surface-secondary'}
          >
            <Text as={'h3'} variant={'headingMd'}>
              {'Resize History'}
            </Text>
          </Box>
        </Bleed>

        <Box minHeight={'5rem'}>
          {!resizeHistory?.history?.length && (
            <div
              style={{
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text as={'p'}>
                {'There is no resized version of this image!'}
              </Text>
            </div>
          )}

          <Scrollable horizontal shadow>
            <InlineStack wrap={false} gap={'400'}>
              {resizeHistory?.history?.map((image) => {
                const isSelected = previewImage?.id === image.id;
                return (
                  <div
                    key={image.id}
                    onClick={() => setPreviewImage(image)}
                    style={{
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <Box
                      position={'relative'}
                      background={isSelected ? 'bg-surface-brand' : undefined}
                    >
                      {isSelected && (
                        <Backdrop
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <CheckIcon fill={'#fff'} width={32} />
                        </Backdrop>
                      )}
                      <Thumbnail
                        size={'large'}
                        alt={image.id}
                        source={image.url}
                      />
                    </Box>
                  </div>
                );
              })}
            </InlineStack>
          </Scrollable>
        </Box>
      </BlockStack>
    </AppCard>
  );
}
