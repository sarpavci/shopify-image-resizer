import { useParams } from 'react-router-dom';
import { Page, Layout, BlockStack, Banner } from '@shopify/polaris';

import { useEditorStore } from '@src/store/editor';

import { ResizeAndPreview } from '@src/components/studio-editor/resize-and-preview';
import { ImageSelector } from '@src/components/studio-editor/image-selector';
import { ResizeHistory } from '@src/components/studio-editor/resize-history';

export function StudioEditor() {
  const params = useParams();

  const { error } = useEditorStore();

  return (
    <Page title={'Image Resize Studio'}>
      <BlockStack gap={'500'}>
        {error && <Banner tone={'critical'}>{error}</Banner>}

        <Layout>
          <Layout.Section variant="oneThird">
            {params?.productId && (
              <ImageSelector productId={params.productId} />
            )}
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap={'300'}>
              <ResizeAndPreview />

              <ResizeHistory />
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
