import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Public } from '../../common/decorators';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Public()
  check() {
    return this.healthService.check();
  }

  @Get('db')
  @Public()
  checkDatabase() {
    return this.healthService.checkDatabase();
  }
}
