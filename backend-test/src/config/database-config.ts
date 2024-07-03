import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize/types';

export const databaseConfig = registerAs('database', () => ({
  dialect: (process.env.DB_DIALECT || 'mysql') as Dialect,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'eigen-test',
}));
