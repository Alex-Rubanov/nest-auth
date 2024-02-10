import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', description: "User's email address" })
  readonly email: string

  @ApiProperty({ example: 'secret123', description: "User's password" })
  readonly password: string
}
