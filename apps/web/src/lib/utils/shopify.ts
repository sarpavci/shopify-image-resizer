export const getIdFromProductId = (productId: string): string => {
  return productId.replace('gid://shopify/Product/', '');
};

export const getFullIdFromProductId = (id: string): string => {
  return `gid://shopify/Product/${id}`;
};

export const validateShopifySubdomain = (
  domain?: string
): {
  isValid: boolean;
  domain?: string;
  subdomain?: string;
  error?: string;
} => {
  if (!domain) {
    return {
      isValid: false,
      error: 'URL is required and must be a string',
    };
  }

  const SHOPIFY_SUBDOMAIN_REGEX =
    /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.myshopify\.com$/;

  const match = domain.match(SHOPIFY_SUBDOMAIN_REGEX);

  if (match) {
    const subdomain = domain.replace('.myshopify.com', '');
    return {
      isValid: true,
      domain,
      subdomain,
    };
  }

  return {
    isValid: false,
    error: 'Invalid Shopify subdomain format',
  };
};
