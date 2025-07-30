import { Express, Request, Response } from 'express';

import { createShopifyAdminClient } from '../lib/utils/shopify';

import requireAuth from '../lib/middlewares/require-auth';

export default (app: Express) => {
  app.post(
    '/graphql/shopify',
    requireAuth,
    async (req: Request, res: Response) => {
      try {
        const { query, variables } = req.body;

        const storeDomain = req?.user?.storeDomain;
        const accessToken = req?.user?.accessToken;

        if (!storeDomain || !accessToken) {
          return res.status(401).json({
            error: 'Unauthorized',
            detail: 'Missing shop credentials in session',
          });
        }

        const shopifyAdminClient = createShopifyAdminClient(
          storeDomain,
          accessToken
        );

        const response = await shopifyAdminClient.request(query, {
          variables: variables || {},
        });

        return res.json(response);
      } catch (error) {
        console.error('Shopify GraphQL Proxy Error:', error);

        if (!(error instanceof Error) || !('response' in error)) {
          return res.status(500).json({
            error: 'Something went wrong',
            detail: 'Internal server error',
          });
        }

        return res.status(500).json({
          error: 'Something went wrong',
          detail: error.message,
        });
      }
    }
  );
};
