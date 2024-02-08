import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getRoot(): string {
    return '<h1>Hello NestJS!!!</h1>'
  }
}
