import { QuotesDTO } from '../dto/quotes.dto';
import { QueryParamsQuotesDto } from '../dto/query-params-quotes';

export interface QuotesContract {
  getQuotes(query: QueryParamsQuotesDto): Promise<QuotesDTO[]>;
}
