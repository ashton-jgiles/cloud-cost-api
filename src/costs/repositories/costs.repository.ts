import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Cost } from '../entities/cost.entity';

@Injectable()
export class CostsRepository {
  private readonly logger = new Logger(CostsRepository.name);

  constructor(
    @InjectRepository(Cost)
    private readonly costsRepository: Repository<Cost>,
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

  async getCostsByProvider(): Promise<any[]> {
    try {
      const sql = `
      `;
      
      return await this.executeRawSQL(sql);
    } catch (error) {
      this.logger.error(`Failed to get costs by provider: ${error.message}`);
      throw error;
    }
  }
}
