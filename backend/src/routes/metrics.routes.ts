import { Router } from 'express';
import { cache } from '../utils/cache';

const router = Router();

router.get('/metrics', (_req, res) => {
  const stats = cache.getStats();
  res.json({
    uptime: process.uptime(),
    cacheKeys: cache.keys().length,
    cacheHits: stats.hits,
    cacheMisses: stats.misses,
  });
});

export default router;
