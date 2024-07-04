import * as path from 'path';
import * as dotenv from 'dotenv';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { databaseConfig } from './database-config';

// Environment Setup
const env = process.env.NODE_ENV;
const dotenv_path = path.resolve(process.cwd(), env ? `.env.${env}` : '.env');
dotenv.config({ path: dotenv_path });

const dbConfig = databaseConfig();

const sequelizeConfig: SequelizeModuleOptions = {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
};

export default sequelizeConfig;
