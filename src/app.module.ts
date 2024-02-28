import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AppConfig, DB_Config } from './config/configuration'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { FilesModule } from './files/files.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    AppConfig,
    DB_Config,
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
