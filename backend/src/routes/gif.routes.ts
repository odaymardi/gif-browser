import { Router } from 'express';
import { getTrendingGifs, searchGifsHandler } from '../controllers/gif.controller';

const router = Router();

router.get('/popular', getTrendingGifs);
router.get('/search',  searchGifsHandler);


export default router;
