import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [
    AuthResolver, //
    AuthService,
    UsersService, //
  ],
})
class AuthModule {}
