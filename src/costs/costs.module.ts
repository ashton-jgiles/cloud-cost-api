import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { CostsRepository } from './repositories/costs.repository';
import { Cost } from './entities/cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cost])],
  providers: [CostsService, CostsRepository],
  controllers: [CostsController],
  exports: [CostsService],
})
export class CostsModule {}