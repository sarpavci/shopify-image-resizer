import { useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import { Route, Routes, Navigate } from 'react-router-dom';
import translations from '@shopify/polaris/locales/en.json';

import '@shopify/polaris/build/esm/styles.css';

import { useAuthStore } from '@src/store/auth';

import { ApolloProvider } from '@src/providers/apollo-provider';

import { AppLayout } from '@src/components/app-layout';
import { GuestRoute } from '@src/components/guest-route';
import { ProtectedRoute } from '@src/components/protected-route';

import { Login } from '@src/app/pages/login';
import { Studio } from '@src/app/pages/studio';
import { StudioEditor } from '@src/app/pages/studio-editor';

export function App() {
  const { isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth().then();
  }, [checkAuth]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ApolloProvider>
      <AppProvider i18n={translations}>
        <AppLayout>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route index element={<Navigate to={'/studio'} />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/studio/:productId" element={<StudioEditor />} />
            </Route>
          </Routes>
        </AppLayout>
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
