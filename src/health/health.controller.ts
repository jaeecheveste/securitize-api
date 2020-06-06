import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
    /* tslint:disable */
    constructor() { }
    /* tslint:enable */

    @ApiExcludeEndpoint()
    @Get()
    async health(@Res() res: any) {
        return res.status(HttpStatus.CREATED).json({ msg: 'ok' });
    }
}
