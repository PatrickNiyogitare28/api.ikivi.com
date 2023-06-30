import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ContributionEntity } from './contribution.entity';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { ContributionTermService } from '../contribution-term/contribution-term.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContributionEntity,
      GroupEntity,
      GroupMembersEntity,
      ContributionTermEntity,
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [ContributionController],
  providers: [
    ContributionService,
    GroupService,
    GroupMembersService,
    ContributionTermService,
  ],
})
export class ContributionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ContributionController);
  }
}
