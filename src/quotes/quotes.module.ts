import { Module, HttpModule } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { quotesProvider } from './quotes.provider';
import { databaseProvider } from 'src/database/database.provider';

@Module({
  imports: [HttpModule],
  controllers: [QuotesController],
  providers: [QuotesService, ...databaseProvider, ...quotesProvider],
  exports: [...quotesProvider],
})
export class QuotesModule {}
