import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'http://localhost:5173' });
    
    const port = process.env.PORT ?? 3000;
    console.log(`🚀 Starting NestJS application on port ${port}...`);
    
    app.useGlobalFilters();
    
    await app.listen(port, '0.0.0.0');
    console.log(`✅ NestJS application is running on port ${port}`);
    
    // Keep the process alive and log any unhandled errors
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    });
    
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
    });
    
  } catch (error) {
    console.error('❌ Failed to start NestJS application:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('❌ Bootstrap failed:', error);
  process.exit(1);
});
