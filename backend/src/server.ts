import app from './app';
import logger from './lib/logger';
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Backend running on http://localhost:${PORT}`);
});
