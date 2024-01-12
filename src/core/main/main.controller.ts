import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common';

@Controller('main')
export class MainController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @HttpCode(200)
  run() {
    this.logger.log('Main endpoint called!');
    return { status: 'ok' };
  }
}
