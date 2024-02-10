import { ApiProperty } from '@nestjs/swagger'

export class CreateUserRoleDto {
  @ApiProperty({ example: 'ADMIN', description: "User's role" })
  readonly value: string
}
