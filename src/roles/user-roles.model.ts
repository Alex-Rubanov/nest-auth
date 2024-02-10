import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../users/users.model'
import { Role } from './roles.model'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: 1, description: "Unique user's role identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 1, description: "User's role id (foreign key)" })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number

  @ApiProperty({ example: 1, description: "User's id (foreign key)" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number
}
