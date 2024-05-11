import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'noahlee',
  password: 'password123@',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,tx}'],
  synchronize: true,
};
