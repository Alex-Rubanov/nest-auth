import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './users.model'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'
import { RolesModule } from '../roles/roles.module'
import { AuthModule } from '../auth/auth.module'
import { Post } from '../posts/posts.model'

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, Post]), RolesModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
