import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();

    response.status(HttpStatus.OK).json({
      status_code: statusCode, // Chuyển statusCode thành status_code
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
