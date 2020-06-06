import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, stream: CallHandler): Observable<any> {
    // stream$ is an Observable of the controller's result value
    return stream.handle().pipe(
      tap(data => {
        if (data === null) {
          throw new NotFoundException();
        }
      }),
    );
  }
}
