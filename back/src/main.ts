import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Prueba Técnica de Flexxus')
    .setDescription('API para el proyecto de prueba técnica de Flexxus')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {customSiteTitle: 'Prueba Técnica de Flexxus'});

  const loggerMiddleware = new LoggerMiddleware();
  app.use(loggerMiddleware.use)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  const port = process.env.PORT || 3001; 

  await app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
  });
}
bootstrap();
