import React, { CSSProperties } from 'react';
import { Text, Card, Spinner, Banner } from '@shopify/polaris';
import { CardProps } from '@shopify/polaris/build/ts/src/components/Card/Card';

type AppCardProps = CardProps & {
  loading?: boolean;
  style?: CSSProperties;
  error?: string | Error;
};

export function AppCard({
  error,
  style,
  loading,
  children,
  ...props
}: React.PropsWithChildren<AppCardProps>) {
  error = error instanceof Error ? error.message : error;

  return (
    <Card {...props}>
      <div style={style}>
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              gap: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Spinner size="large" />
            <Text variant="bodyLg" as="p" tone="subdued">
              {'Loading...'}
            </Text>
          </div>
        ) : (
          <>
            {error && <Banner tone={'critical'}>{error}</Banner>}
            {!error && children}
          </>
        )}
      </div>
    </Card>
  );
}
