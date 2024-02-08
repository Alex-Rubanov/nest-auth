import { Module } from '@nestjs/common'
import { AppConfig, DB_Config } from './config/configuration'
import { UsersModule } from './users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [AppConfig, DB_Config, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
