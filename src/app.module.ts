import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DATABASE_HOST')?.trim(),
          port: parseInt(config.get<string>('DATABASE_PORT')?.trim() ?? '5432', 10),
          username: config.get<string>('DATABASE_USER')?.trim(),
          password: config.get<string>('DATABASE_PASS')?.trim(),
          database: config.get<string>('DATABASE_NAME')?.trim(),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
