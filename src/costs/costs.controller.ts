import { Controller, Get } from '@nestjs/common';
import { CostsService } from './costs.service';

@Controller('costs')
export class CostsController {
  constructor(private readonly costsService: CostsService) {}

  @Get('costsByProvider')
  async getCostsByProvider() {
    return this.costsService.getCostsByProvider();
  }
}