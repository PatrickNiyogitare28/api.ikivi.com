import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './logs.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LogsController);
  }
}
