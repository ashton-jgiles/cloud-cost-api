import { Injectable } from '@nestjs/common';
import { CostsRepository } from './repositories/costs.repository';

@Injectable()
export class CostsService {
  constructor(private readonly costsRepository: CostsRepository) {}

  async getCostsByProvider(): Promise<any[]> {
    return this.costsRepository.getCostsByProvider();
  }
}