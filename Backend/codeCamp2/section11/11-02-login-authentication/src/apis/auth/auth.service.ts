import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { IAuthService } from './interfaces/auth-service.interface';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  /** Repository를 주입에 직접 DB 접근하지 않고
   *  usersService의 검증 로직 재사용
   */
  async login({ email, password }: IAuthService) {
    // DB에 등록되어있는 유저 확인
    const user = await this.usersService.findOneByEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('email이 존재 하지 않습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 유전 존재하고 비밀번호도 맞으니 엑세스 토큰 발급(JWT 토큰)
  }
}
