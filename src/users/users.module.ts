import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';

import { TypeOrmUserRepository } from './repositories/typeorm-user.repository';
import { UsersServiceImpl } from './users.service.impl';

import { USER_REPOSITORY, USER_SERVICE } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UsersServiceImpl,
    },
  ],
  exports: [USER_SERVICE],
})
export class UsersModule {}
