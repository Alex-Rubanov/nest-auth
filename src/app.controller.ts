import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Root')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test endpoint' })
  @ApiResponse({ status: 200 })
  @Get()
  root() {
    return this.appService.getRoot()
  }
}
