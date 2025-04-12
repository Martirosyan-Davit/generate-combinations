export const SERVER_CONFIG = {
  port: Number.parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
};
