import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateUserRoleDto } from './dto/create-user-role.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from './roles.model'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Retrieve all available roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.roleService.getAllRoles()
  }

  @ApiOperation({ summary: 'Create role for user' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  create(@Body() dto: CreateUserRoleDto) {
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: "Retrieving user's role information by provided query" })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }
}
