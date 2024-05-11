import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeORMConfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
