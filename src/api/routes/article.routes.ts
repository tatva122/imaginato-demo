import { NextFunction, Response, Router } from 'express';
import articleService from '../../services/article.service';

const getArticle = async (req: any, res: Response, next: NextFunction) => {
  try {
    const start = req.headers.startTime || Date.now();
    const { user } = req;
    const uploadResumeURL = await articleService.getArticle(user);
    const end = Date.now();
    res.setHeader('X-Response-Time', end - +start);
    return res.status(200).json({ ResumeCertificationsURL: uploadResumeURL });
  } catch (error) {
    return next(error);
  }
};

const getArticles = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { query } = req;
    const articles = await articleService.getArticles(query);
    return res.status(200).json({ articles });
  } catch (error) {
    return next(error);
  }
};

const createArticle = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const created = await articleService.createArticle(body);
    return res.status(200).json(created);
  } catch (error) {
    return next(error);
  }
};

export default (app: Router) => {
  app.post('/article', createArticle);
  app.get('/article', getArticle);
  app.get('/articles', getArticles);
};
