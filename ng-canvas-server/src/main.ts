import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  await app.listen(PORT);
  console.log(`listen on port ${PORT}`);
  
}
bootstrap();
