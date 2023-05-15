import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_BACKEND_URL,
  type: process.env.DATABASE_TYPE,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  password: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED,
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
}));
