import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (permite peticiones desde cualquier origen)
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
