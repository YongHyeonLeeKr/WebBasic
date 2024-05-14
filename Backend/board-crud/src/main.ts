import { NestFactory } from '@nestjs/core';
import { BoardsModule } from './boards/boards.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS를 전역적으로 활성화
  app.enableCors();
  await app.listen(6376);
}
bootstrap();
