import { QuotesDTO } from './dto/quotes.dto';
import { QuotesContract } from './interfaces/quotes.interface';
import { QueryParamsQuotesDto } from './dto/query-params-quotes';
import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class QuotesService implements QuotesContract {
  constructor(private httpService: HttpService) {}

  async getQuotes(query: QueryParamsQuotesDto): Promise<QuotesDTO[]> {
    const quotesPath = '/v1/cryptocurrency/listings/latest';
    const response = await this.httpService
      .get(`${process.env.COINMARKET_URL}${quotesPath}`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
        },
        params: {
          start: query.startPage,
          limit: query.limit,
        },
      })
      .toPromise();
    //Should create global mapper response

    const quotes = response.data
      ? response.data.data.map(q => {
          const quote = {
            id: q.id,
            name: q.name,
            circulatingSupply: q.circulating_supply,
            price: q.quote && q.quote.USD ? q.quote.USD.price : null,
          } as QuotesDTO;
          return quote;
        })
      : [];
    return quotes;
  }
}
