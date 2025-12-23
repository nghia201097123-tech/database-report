import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

import { join } from 'path';
import * as express from 'express';

import { ExceptionResponseDetail } from './utils/exception/utils.exception.common';
import { HttpExceptionFilter } from './utils/exception/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Sử dụng Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use('/public', express.static(join(__dirname, 'public')));

  // Cấu hình để phục vụ tệp từ thư mục ngoài
  app.use(
    '/files',
    express.static(join(__dirname, '../src/export/file-store-export')),
  );

  // Cấu hình Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0],
          ),
          HttpStatus.BAD_REQUEST, // BAD_REQUEST cho validation error
        );
      },
    }),
  );

  await app.listen(1997);
}
bootstrap();
