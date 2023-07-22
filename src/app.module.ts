import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { UserModule } from './modules/user/user.module';
import { OtpModule } from './modules/otp/otp.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { GroupModule } from './modules/group/group.module';
import { GroupMetadataModule } from './modules/group-metadata/group-metadata.module';
import { GroupMembersModule } from './modules/group-members/group-members.module';
import { JoinCodesModule } from './modules/join-codes/join-codes.module';
import { JoinRequestsModule } from './modules/join-requests/join-requests.module';
import { ContributionTermModule } from './modules/contribution-term/contribution-term.module';
import { ContributionModule } from './modules/contribution/contribution.module';
import { GroupInterestsModule } from './modules/group-interests/group-interests.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PeriodicEarnModule } from './modules/periodic-earn/periodic-earn.module';
import { LoanModule } from './modules/loan/loan.module';
import { LoanRequestsModule } from './modules/loan-requests/loan-requests.module';
import { LogsModule } from './modules/logs/logs.module';
import { LogsHistoryModule } from './modules/logs-history/logs-history.module';
import { AppLoggerMiddleware } from './common/middlewares/logs.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    OtpModule,
    AuthModule,
    GroupModule,
    GroupMetadataModule,
    GroupMembersModule,
    JoinCodesModule,
    JoinRequestsModule,
    ContributionTermModule,
    ContributionModule,
    GroupInterestsModule,
    TransactionsModule,
    PeriodicEarnModule,
    LoanModule,
    LoanRequestsModule,
    LogsModule,
    LogsHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes({ path: '*/profile', method: RequestMethod.GET });
  }
}
