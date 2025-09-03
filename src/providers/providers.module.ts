import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controler';
import { ProvidersRepository } from './repositories/providers.repository';
import { Provider } from './entities/providers.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Provider])],
    providers: [ProvidersService, ProvidersRepository],
    controllers: [ProvidersController],
    exports: [ProvidersService],
  })
  export class ProvidersModule {}