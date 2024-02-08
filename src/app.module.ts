import { Module } from '@nestjs/common'
import { AppConfig, DB_Config, StaticServeConfig } from './config/configuration'
import { UsersModule } from './users/users.module'

@Module({
  imports: [AppConfig, StaticServeConfig, DB_Config, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
