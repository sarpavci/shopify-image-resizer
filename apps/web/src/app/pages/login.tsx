import { useState, FormEvent } from 'react';
import { Page, Card, FormLayout, TextField, Button } from '@shopify/polaris';

import { validateShopifySubdomain } from '@src/lib/utils/shopify';

export function Login() {
  const [shop, setShop] = useState<Optional<string>>('');
  const [error, setError] = useState<Optional<string>>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateShopifySubdomain(shop);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    window.location.href = `/api/auth/shopify?shop=${shop}`;
  };

  return (
    <Page title="Login">
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormLayout>
            <TextField
              value={shop}
              autoComplete="on"
              onChange={setShop}
              label="Shop Domain"
              placeholder="your-shop.myshopify.com"
              helpText={!error && 'Enter your Shopify shop domain'}
              error={error}
            />
            <Button submit disabled={!shop} variant={'primary'}>
              Connect to Shopify
            </Button>
          </FormLayout>
        </form>
      </Card>
    </Page>
  );
}
