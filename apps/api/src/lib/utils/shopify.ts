import { createAdminApiClient } from '@shopify/admin-api-client';

export const createShopifyAdminClient = (
  storeDomain: string,
  accessToken: string
) => {
  const apiVersion = '2025-10';

  return createAdminApiClient({ apiVersion, storeDomain, accessToken });
};
