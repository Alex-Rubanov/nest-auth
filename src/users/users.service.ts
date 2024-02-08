import { Get, Injectable, Post } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  @Get()
  async getAllUsers() {
    return await this.userRepository.findAll()
  }

  @Get()
  async getById(id: string) {
    return await this.userRepository.findAll({ where: { id } })
  }

  @Post()
  async createUser(userDto: CreateUserDto) {
    return await this.userRepository.create(userDto)
  }
}
