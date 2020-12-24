import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';

const GLOBAL_PREFIX = '';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { logger: true });
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(serverConfig.port);
  logger.log(`Application started on port ${serverConfig.port}`);
  logger.log(
    'Listening at http://localhost:' + serverConfig.port + '/' + GLOBAL_PREFIX,
  );
}
bootstrap();
