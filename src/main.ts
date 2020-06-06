// src/main.ts
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-excetions.filter';
import * as basicAuth from 'express-basic-auth';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.startAllMicroservicesAsync();

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const MongoStore = require('connect-mongo')(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
      genid(req) {
        let sessionId = req.sessionID;
        return sessionId;
      },
      store: new MongoStore({
        url: process.env.MONGO_URL,
      }),
    }),
  );

  const options = new DocumentBuilder()
    .addTag('API')
    .setDescription('Insert description....')
    .setVersion('1.0')
    .build();
  app.use(
    '/doc',
    basicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
