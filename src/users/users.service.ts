import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async getById(id: string) {
    return await this.userRepository.findOne({ where: { id }, include: { all: true } })
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true }, raw: true })
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('USER')

    await user.$set('roles', [role])
    user.roles = [role]

    return user
  }
}
