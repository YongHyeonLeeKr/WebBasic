import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeORMConfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
})
export class AppModule {}
