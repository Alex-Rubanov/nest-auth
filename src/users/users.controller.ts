import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Retrieving all users information' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @UseGuards(RolesGuard)
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user information by id' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @Post('email')
  getByEmail(@Body() email: string) {
    return this.userService.getByEmail(email)
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  @ApiOperation({ summary: 'Add role to a user' })
  @ApiResponse({ status: 204, type: User })
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto)
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 204 })
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto)
  }
}
