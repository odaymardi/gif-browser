import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import compression from 'compression';
import { HttpError } from './errors/HttpError';
import logger from './lib/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

app.use('/api/', apiLimiter);

app.use(routes);

app.get('/healthz', (_req, res) => { res.send('OK') });

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    logger.warn({ status: err.statusCode, path: req.path, message: err.message }, 'Handled error');
    res.status(err.statusCode).json({ error: err.message });
  } else {
    logger.error({ path: req.path, error: err }, 'Unhandled server error');
    res.status(500).json({ error: 'Internal Server Error' });
  }
  next();
};

app.use(errorHandler);

export default app;