import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Provider } from '../entities/providers.entity';

@Injectable()
export class ProvidersRepository {
  private readonly logger = new Logger(ProvidersRepository.name);

  constructor(
    @InjectRepository(Provider)
    private readonly providersRepository: Repository<Provider>,
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

  async getProviders(): Promise<any[]> {
    try {
      const sql = `
          SELECT 
              id,
              provider_name
          FROM providers
          ORDER BY provider_name
      `;
      
      return await this.executeRawSQL(sql);
    } catch (error) {
      this.logger.error(`Failed to get costs by provider: ${error.message}`);
      throw error;
    }
  }
}
