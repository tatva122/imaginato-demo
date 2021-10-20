import { Router } from 'express';

import Article from './routes/article.routes';

const router = Router();

Article(router);

export default () => {
  return router;
};
