import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Service } from '../entities/services.entity';

@Injectable()
export class ServicesRepository {
  private readonly logger = new Logger(ServicesRepository.name);

  constructor(
    @InjectRepository(Service)
    private readonly costsRepository: Repository<Service>,
    private readonly dataSource: DataSource,
  ) {}

  // Raw SQL queries using DataSource
  async executeRawSQL(sql: string, parameters: any[] = []): Promise<any[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      this.logger.debug(`Executing SQL: ${sql} with parameters: ${JSON.stringify(parameters)}`);
      const result = await queryRunner.query(sql, parameters);
      this.logger.debug(`SQL execution successful, returned ${result?.length || 0} rows`);
      return result;
    } catch (error) {
      this.logger.error(`SQL execution failed: ${error.message}`, error.stack);
      throw new Error(`Database query failed: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async getServices(): Promise<any[]> {
    try {
      const sql = `
          SELECT 
              id,
              service_name,
              service_provider,
              service_desc
          FROM services
          ORDER BY service_provider
      `;
      
      return await this.executeRawSQL(sql);
    } catch (error) {
      this.logger.error(`Failed to get costs by provider: ${error.message}`);
      throw error;
    }
  }
}
