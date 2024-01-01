/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix(configService.get('app.apiPrefix'));
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
