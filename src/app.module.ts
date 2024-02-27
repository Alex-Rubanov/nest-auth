import { Module } from '@nestjs/common'
import { AppConfig, DB_Config } from './config/configuration'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'

@Module({
  imports: [AppConfig, DB_Config, UsersModule, RolesModule, AuthModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
