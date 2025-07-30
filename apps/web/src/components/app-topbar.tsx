import {
  Box,
  InlineStack,
  Text,
  Popover,
  ActionList,
  Button,
} from '@shopify/polaris';
import { useState } from 'react';

import { useAuthStore } from '@src/store/auth';
import { Link } from 'react-router-dom';

export function AppTopBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const userMenuActivator = (
    <div style={{ minWidth: '12rem' }}>
      <Button
        fullWidth
        disclosure
        variant={'tertiary'}
        onClick={() => setUserMenuActive(!userMenuActive)}
      >
        {user?.username}
      </Button>
    </div>
  );

  return (
    <Box
      borderColor={'border'}
      paddingBlockEnd={'300'}
      paddingInlineEnd={'400'}
      paddingBlockStart={'300'}
      background={'bg-surface'}
      paddingInlineStart={'400'}
      borderBlockEndWidth={'025'}
    >
      <InlineStack align="space-between" blockAlign="center">
        <Link to={'/studio'} style={{ textDecoration: 'none', color: '#000' }}>
          <InlineStack gap="300" align="center">
            <Box background={'bg-fill-brand'} borderRadius="100">
              <div
                style={{
                  minWidth: '2rem',
                  minHeight: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text as="span" variant="headingMd" tone="text-inverse">
                  {'S'}
                </Text>
              </div>
            </Box>
            <Text as="h1" variant="headingLg">
              {'Shopify Image Resizer'}
            </Text>
          </InlineStack>
        </Link>

        {isAuthenticated && (
          <Popover
            sectioned
            ariaHaspopup={false}
            active={userMenuActive}
            activator={userMenuActivator}
            onClose={() => setUserMenuActive(false)}
          >
            <div style={{ minWidth: '10rem' }}>
              <ActionList
                actionRole="menuitem"
                items={[
                  {
                    content: 'Sign out',
                    destructive: true,
                    onAction: async () => {
                      setUserMenuActive(false);

                      await logout();
                    },
                  },
                ]}
              />
            </div>
          </Popover>
        )}
      </InlineStack>
    </Box>
  );
}
