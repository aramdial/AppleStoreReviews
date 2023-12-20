import { Router } from 'express';
import { getFeed } from '../../controllers/feed';

export const router = Router();

router.get('/:appId/:country/entries', getFeed);
