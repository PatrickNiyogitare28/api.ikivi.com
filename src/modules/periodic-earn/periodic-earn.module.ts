import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { PeriodicEarnEntity } from './periodic-earn.entity';
import { PeriodicEarnController } from './periodic-earn.controller';
import { PeriodicEarnService } from './periodic-earn.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PeriodicEarnEntity, GroupEntity, GroupMembersEntity, ContributionTermEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [PeriodicEarnController],
  providers: [PeriodicEarnService, GroupService, GroupMembersService, ContributionTermService]
})
export class PeriodicEarnModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PeriodicEarnController)
  }
}
