import { Router } from 'express';
import { getFeed } from '../../controllers/feed';

export const router = Router();

router.get('/:appId/:country/:sortBy/:page?', getFeed);

router.get('/:appId/:country/:page?', getFeed);
