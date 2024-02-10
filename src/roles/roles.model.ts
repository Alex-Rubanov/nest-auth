import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { User } from '../users/users.model'
import { UserRoles } from './user-roles.model'

interface RoleInterface {
  value: string
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleInterface> {
  @ApiProperty({ example: 1, description: "Unique user's identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'ADMIN', description: "Unique user's role" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string

  @ApiProperty({ example: 'Administrator of data', description: "Description of user's role" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
