import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'Internal server error';
    let error = 'Error';

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const objectResponse = exceptionResponse as any;
      message = objectResponse.message || message;
      error = objectResponse.error || error;
    } else {
      message = String(exceptionResponse);
    }

    // Ensure message is a string (not an array)
    if (Array.isArray(message)) {
      message = message[0] || 'Internal server error';
    }

    const errorResponse = {
      success: false,
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
    };

    // Log errors for debugging
    if (status >= 500) {
      this.logger.error(`[${status}] ${error}: ${message}`, exception.stack);
    } else if (status >= 400) {
      this.logger.warn(`[${status}] ${error}: ${message}`);
    }

    response.status(status).json(errorResponse);
  }
}
