/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { NotificationEntity } from './notifications.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(NotificationsController);
  }
}
