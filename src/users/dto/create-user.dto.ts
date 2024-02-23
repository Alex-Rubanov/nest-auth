import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @ApiProperty({ example: 'example@example.com', description: "User's email address" })
  readonly email: string

  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Password length must be between 4 and 16' })
  @ApiProperty({ example: 'secret123', description: "User's password" })
  readonly password: string
}
