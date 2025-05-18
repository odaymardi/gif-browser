import { Router } from 'express';
import gifRoutes from './gif.routes';
import metricsRoutes from './metrics.routes';

const router = Router();

router.use('/api/gifs', gifRoutes);
router.use('/api', metricsRoutes);

export default router;
