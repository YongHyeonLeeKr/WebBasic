import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** 데이터가 오고가는 흐름에 있어서 데이터 검증과 필터링을 해주는 역할 */
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
