import { Injectable } from '@nestjs/common';
import { ProvidersRepository } from './repositories/providers.repository';

@Injectable()
export class ProvidersService {
  constructor(private readonly providersRepository: ProvidersRepository) {}

  async getProviders(): Promise<any[]> {
    return this.providersRepository.getProviders();
  }
}