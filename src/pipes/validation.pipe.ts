import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'

export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      const messages = errors.reduce((acc, { property, constraints }) => {
        acc[property] = constraints

        return acc
      }, {})

      throw new ValidationException(messages)
    }

    return value
  }
}
