import express from 'express';
import morgan from 'morgan';

import { SERVER_CONFIG } from './config/server.js';
import {
  errorConverter,
  errorHandler,
  logErrors,
  notFoundHandler,
} from './middlewares/error-middleware.js';
import { router } from './routes/api.js';
import { DatabaseService } from './services/db.service.js';
import { logger, morganStream } from './utils/logger.js';

async function createApp() {
  const app = express();

  app.use(morgan('combined', { stream: morganStream }));
  app.use(express.json());

  app.use('/api/v1', router);

  app.use(notFoundHandler);
  app.use(logErrors);
  app.use(errorConverter);
  app.use(errorHandler);

  return app;
}

async function startServer() {
  try {
    logger.info('Initializing database...');
    await DatabaseService.initializeDatabase();
    logger.info('Database initialized successfully');

    const app = await createApp();

    const server = app.listen(SERVER_CONFIG.port, () => {
      logger.info(`Server running in ${SERVER_CONFIG.env} mode on port ${SERVER_CONFIG.port}`);
    });

    process.on('unhandledRejection', (err) => {
      logger.error('Unhandled Rejection! Shutting down...');
      logger.error(err.name, err.message);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (err) => {
      logger.error('Uncaught Exception! Shutting down...');
      logger.error(err.name, err.message);
      server.close(() => process.exit(1));
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
startServer().catch((error) => {
  logger.error('Unhandled error in server startup:', error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
