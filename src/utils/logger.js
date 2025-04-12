/* eslint-disable unicorn/numeric-separators-style */
import { inspect } from 'util';
import winston from 'winston';

const { combine, timestamp, printf, colorize, align } = winston.format;

const devFormat = printf(({ level, message, timestamp, stack }) => {
  const msg = stack || message;

  return `${timestamp} [${level}]: ${msg}`;
});

const prodFormat = printf(({ level, message, timestamp }) => {
  const msg =
    typeof message === 'object' ? inspect(message, { depth: null, colors: true }) : message;

  return `${timestamp} [${level}]: ${msg}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
});

export const morganStream = {
  write: (message) => logger.info(message.trim()),
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
