import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CheckIcon } from '@shopify/polaris-icons';
import { BlockStack, Text, Scrollable } from '@shopify/polaris';

import { AppCard } from '@src/components/app-card';
import { Backdrop } from '@src/components/backdrop';
import { StyledBox } from '@src/components/styled-box';

import { getFullIdFromProductId } from '@src/lib/utils/shopify';

import {
  getProductMediasQuery,
  GetProductMediasByProductIdResult,
  GetProductMediasByProductIdVariables,
} from '@src/queries/get-product-medias';
import { useEditorStore } from '@src/store/editor';

type ImageSelectorProps = {
  productId: string;
};

export function ImageSelector({ productId }: ImageSelectorProps) {
  const { setError, selectedImage, setSelectedImage } = useEditorStore();

  const { data, loading, error } = useQuery<
    GetProductMediasByProductIdResult,
    GetProductMediasByProductIdVariables
  >(getProductMediasQuery, {
    variables: { productId: getFullIdFromProductId(productId) },
  });

  useEffect(() => {
    if (error) setError(error.message);
  }, [error, setError]);

  const mediaEdges = data?.productByIdentifier?.media?.edges ?? [];

  return (
    <AppCard loading={loading} style={{ height: 'calc(100vh - 16.5rem)' }}>
      <BlockStack gap={'300'}>
        <Text as={'h3'} variant={'headingMd'}>
          {'Select Image'}
        </Text>

        <Scrollable style={{ height: 'calc(100vh - 19rem)' }}>
          <BlockStack gap={'300'}>
            {mediaEdges?.map((image) => (
              <StyledBox
                key={image.node.id}
                onClick={() => setSelectedImage(image.node)}
                style={{
                  width: '100%',
                  height: '10rem',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  border: '1px solid',
                  position: 'relative',
                  borderRadius: '0.5rem',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'transparent',
                  backgroundImage: `url(${image?.node?.preview?.image?.url})`,
                }}
              >
                {selectedImage?.id === image?.node?.id && (
                  <Backdrop
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon fill={'#fff'} width={64} />
                  </Backdrop>
                )}
              </StyledBox>
            ))}
          </BlockStack>
        </Scrollable>
      </BlockStack>
    </AppCard>
  );
}
