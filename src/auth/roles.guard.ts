import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ROLES_KEY } from './roles-auth.decorator'
import { Role } from '../roles/roles.model'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getClass(),
        context.getHandler(),
      ])

      if (!requiredRoles) {
        return true
      }

      const authHeader = request.headers.authorization
      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User in not authorized' })
      }

      const user = this.jwtService.verify(token)
      request.user = user

      return user.roles.some((role: Role) => requiredRoles.includes(role.value))
    } catch (err) {
      throw new HttpException({ message: 'Access forbidden' }, HttpStatus.FORBIDDEN)
    }
  }
}
