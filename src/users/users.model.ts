import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'

interface UserInterface {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserInterface> {
  @ApiProperty({ example: 1, description: 'Unique identifier of User' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'example@example.com', description: "User's email address" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: 'secret123', description: "Users's password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: false, description: 'Information/status if user is banned' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @ApiProperty({ example: 'Users mobbing', description: 'Description of reason why user is banned' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}
