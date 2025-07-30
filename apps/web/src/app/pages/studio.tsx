import {
  Page,
  ResourceItem,
  Avatar,
  Text,
  ResourceList,
} from '@shopify/polaris';
import { useCallback } from 'react';
import { useQuery } from '@apollo/client';

import { AppCard } from '@src/components/app-card';

import { getIdFromProductId } from '@src/lib/utils/shopify';

import { getProductsQuery, GetProductsResult } from '@src/queries/get-products';

type ProductType = GetProductsResult['products']['edges']['0'];

export function Studio() {
  const { data, loading, error } =
    useQuery<GetProductsResult>(getProductsQuery);

  const getProductPrice = useCallback((product: ProductType) => {
    const minVariantPrice = product?.node?.priceRangeV2?.minVariantPrice;
    if (!minVariantPrice) {
      return '-';
    }

    return `${minVariantPrice.amount} ${minVariantPrice?.currencyCode}`;
  }, []);

  const getProductImageUrl = useCallback((product: ProductType) => {
    const productImage = product?.node?.media?.edges?.[0]?.node;
    if (!productImage) {
      return undefined;
    }

    return productImage?.preview?.image?.url;
  }, []);

  return (
    <Page title="Studio">
      <AppCard loading={loading} error={error}>
        <ResourceList
          loading={loading}
          items={data?.products.edges ?? []}
          resourceName={{ singular: 'product', plural: 'products' }}
          renderItem={(product) => (
            <ResourceItem
              id={product.node.id}
              key={product.node.id}
              verticalAlignment={'center'}
              url={`/studio/${getIdFromProductId(product.node.id)}`}
              accessibilityLabel={`View details for ${product.node.title}`}
              media={
                <Avatar
                  size={'xl'}
                  name={product.node.title}
                  source={getProductImageUrl(product)}
                />
              }
            >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {product.node.title}
              </Text>

              <div>{getProductPrice(product)}</div>
            </ResourceItem>
          )}
        />
      </AppCard>
    </Page>
  );
}
