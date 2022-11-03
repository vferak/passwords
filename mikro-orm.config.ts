import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';

const config: MikroOrmModuleSyncOptions = {
  entities: ['./dist/src/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'db.sqlite3',
  type: 'sqlite',
};

export default config;
