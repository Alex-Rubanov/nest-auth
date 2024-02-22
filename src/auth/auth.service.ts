import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../users/users.model'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

const SALT_ROUNDS = 10

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto)

    return this.generateToken(user)
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(dto.email)

    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(dto.password, SALT_ROUNDS)
    const user = await this.userService.createUser({ ...dto, password: hashPassword })

    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles }

    return { access_token: this.jwtService.sign(payload) }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) {
      throw new UnauthorizedException({ message: 'User with this email does not exist' })
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password)

    if (passwordEquals) {
      return user
    }

    throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST)
  }
}
