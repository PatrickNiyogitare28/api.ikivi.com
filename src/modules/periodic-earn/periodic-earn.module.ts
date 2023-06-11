import { Module } from '@nestjs/common';
import { PeriodicEarnService } from './periodic-earn.service';
import { PeriodicEarnController } from './periodic-earn.controller';

@Module({
  providers: [PeriodicEarnService],
  controllers: [PeriodicEarnController]
})
export class PeriodicEarnModule {}
