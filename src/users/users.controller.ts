import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Retrieving all users information' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user information by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }
}
