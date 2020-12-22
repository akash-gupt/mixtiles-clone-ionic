import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

const GLOBAL_PREFIX = '';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

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
  logger.log(
    'Swagger at http://localhost:' +
      serverConfig.port +
      '/' +
      GLOBAL_PREFIX +
      '/docs',
  );
}
bootstrap();
