import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContributionTermService } from './contribution-term.service';
import { ContributionTermController } from './contribution-term.controller';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '../group/group.entity';
import { JwtModule } from '@nestjs/jwt';
import { ContributionTermEntity } from './contribution-term.entity';
import { GroupService } from '../group/group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContributionTermEntity, GroupEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  providers: [ContributionTermService, GroupService],
  controllers: [ContributionTermController]
})
export class ContributionTermModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ContributionTermController)
  }
}
