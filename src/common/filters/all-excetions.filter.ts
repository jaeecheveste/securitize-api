import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  logger: Logger = new Logger('AllExceptionsFilter');

  catch(exception: any, host: ArgumentsHost) {
    this.logger.log(exception);
    if (exception && exception.response && exception.response.error) {
      if (exception.status === HttpStatus.BAD_REQUEST) {
        exception.response.error = 'bad_request';
      }
      if (exception.status === HttpStatus.NOT_FOUND) {
        exception.response.error = 'not_found';
      }
      if (exception.status === HttpStatus.FORBIDDEN) {
        exception.response.error = 'forbidden';
      }
      if (exception.status === HttpStatus.UNAUTHORIZED) {
        exception.response.error = 'unauthorized';
      }
      super.catch(exception, host);
    } else if (exception instanceof Error) {
      const error = exception as Error;
      if (error.name === 'MongoError') {
        const msg = error.message;
        let errmsg;
        try {
          const fieldName = msg.substring(
            msg.lastIndexOf('index') + 7,
            msg.lastIndexOf('_1'),
          );
          errmsg =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            '_not_unique';
        } catch (ex) {
          errmsg = 'field_not_unique';
        }
        exception.name = errmsg.toLowerCase();
      }

      super.catch(
        new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: exception.name
              .replace(/([a-z])([A-Z])/g, '$1_$2')
              .toLowerCase(),
            message: exception.message,
          },
          HttpStatus.CONFLICT,
        ),
        host,
      );
    }
  }
}
