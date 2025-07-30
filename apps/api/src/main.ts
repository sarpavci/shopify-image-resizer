import express from 'express';

import auth from './lib/auth';
import actions from './actions';
import middlewares from './lib/middlewares';

const app = express();

auth.shopify();

middlewares.builtIns(app);
middlewares.serveStatic(app);
middlewares.session(app);
middlewares.passport(app);

actions.commonInfo(app);

actions.authMe(app);
actions.authLogout(app);

actions.authShopify(app);
actions.authShopifyCallback(app);

actions.imageResize(app);
actions.imageResizeHistory(app);

actions.graphqlShopify(app);

middlewares.listen(app);
