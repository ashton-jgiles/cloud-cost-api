import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesRepository } from './repositories/services.repository';
import { Service } from './entities/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesService, ServicesRepository],
  controllers: [ServicesController],
  exports: [ServicesService],
})
export class ServicesModule {}