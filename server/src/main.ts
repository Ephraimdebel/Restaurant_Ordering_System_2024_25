import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Allow all origins by default (you can restrict it to specific origins if needed)
  app.enableCors();



  await app.listen(3333);
}
bootstrap();
