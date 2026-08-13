import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  // ✅ Add this to enable CORS
  app.enableCors({
    origin: true, // Allows all origins in development, you can restrict this in production
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
