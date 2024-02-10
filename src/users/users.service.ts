import { Get, Injectable, Post } from '@nestjs/common'
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

  @Get()
  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  @Get()
  async getById(id: string) {
    return await this.userRepository.findOne({ where: { id }, include: { all: true } })
  }

  @Post()
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('USER')

    await user.$set('roles', [role])

    return user
  }
}
