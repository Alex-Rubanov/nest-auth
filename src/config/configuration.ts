import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SequelizeModule } from '@nestjs/sequelize'
import { join } from 'path'
import { User } from '../users/users.model'

export const AppConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.${process.env.NODE_ENV}.env`],
})

export const StaticServeConfig = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../../..', 'public'),
})

export const DB_Config = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User],
  autoLoadModels: true,
})
