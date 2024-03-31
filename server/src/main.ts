import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const client = process.env.CLIENT_API || 'http://localhost:5173';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [client],
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
