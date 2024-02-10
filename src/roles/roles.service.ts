import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model'
import { CreateUserRoleDto } from './dto/create-user-role.dto'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getAllRoles() {
    return await this.roleRepository.findAll({ include: { all: true } })
  }

  async createRole(dto: CreateUserRoleDto) {
    return await this.roleRepository.create(dto)
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } })
  }
}
