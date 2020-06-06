import {
  Module,
  NestModule,
  HttpModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [DatabaseModule, HttpModule, HealthModule, QuotesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
