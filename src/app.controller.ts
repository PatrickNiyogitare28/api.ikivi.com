import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Welcome')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(): object {
    return this.appService.getHome();
  }
}
