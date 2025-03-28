import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Prueba Técnica de Flexxus')
  //   .setDescription('API ')

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
