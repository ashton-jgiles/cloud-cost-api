import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './repositories/services.repository';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async getServices(): Promise<any[]> {
    return this.servicesRepository.getServices();
  }
}