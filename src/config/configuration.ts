import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { DocumentBuilder } from '@nestjs/swagger'
import { Post } from '../posts/posts.model'
import { User } from '../users/users.model'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'

export const AppConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.${process.env.NODE_ENV}.env`],
})

export const DB_Config = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User, Role, UserRoles, Post],
  autoLoadModels: true,
})

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('NestJS-auth')
  .setDescription('Basic authentication/authorization with roles')
  .addTag('created by Alex')
  .setVersion('1.0.0')
  .build()

export const JWTConfig = JwtModule.register({
  global: true,
  secret: process.env.SECRET_KEY || 'SECRET',
  signOptions: {
    expiresIn: '24h',
  },
})
