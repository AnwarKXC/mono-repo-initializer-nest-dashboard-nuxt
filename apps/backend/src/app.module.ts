import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { UsersModule } from './modules/users';
import { HealthModule } from './modules/health';
import {
  appConfig,
  databaseConfig,
  jwtConfig,
  corsConfig,
  throttleConfig,
} from './config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, corsConfig, throttleConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    // Database
    DatabaseModule,
    // Feature Modules
    HealthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
