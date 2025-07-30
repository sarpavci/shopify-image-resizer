import React from 'react';
import { Frame } from '@shopify/polaris';

import { AppTopBar } from '@src/components/app-topbar';

export function AppLayout({ children }: React.PropsWithChildren<object>) {
  return <Frame topBar={<AppTopBar />}>{children}</Frame>;
}
