import { QuotesService } from './quotes.service';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { NotFoundInterceptor } from 'src/common/interceptors/not-found-interceptor';
import { QueryParamsQuotesDto } from './dto/query-params-quotes';
import { ErrorResponses } from 'src/common/class/error-response';

@ApiTags('quotes')
@UseInterceptors(NotFoundInterceptor)
@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}
  @Get()
  @ApiOperation({ summary: 'List Publications' })
  @ApiNotFoundResponse({
    description: 'The resource was not found',
    type: ErrorResponses,
  })
  @UseInterceptors(NotFoundInterceptor)
  public async getQuotes(@Query() query: QueryParamsQuotesDto): Promise<any> {
    try {
      return await this.quotesService.getQuotes(query);
    } catch (e) {
      throw new NotFoundInterceptor();
    }
  }
}
