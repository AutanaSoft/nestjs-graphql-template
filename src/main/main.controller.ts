import { Controller, Get, HttpCode, Logger } from '@nestjs/common'

@Controller('/')
export class MainController {
  private readonly logger = new Logger(MainController.name)

  constructor() {}

  @Get()
  @HttpCode(200)
  run() {
    this.logger.log('Main endpoint called!')
    return { status: 'ok' }
  }
}
