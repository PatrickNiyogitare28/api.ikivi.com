import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './group.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity]), JwtModule.register({
    secret: process.env.SECRETKEY,
    signOptions: {
      expiresIn: process.env.EXPIRESIN,
    },
  }),],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(AuthMiddleware)
    .forRoutes(GroupController)
  }
}
