import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { IAuthService, IAuthServiceGetAccessToken } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /** Repository를 주입에 직접 DB 접근하지 않고
   *  usersService의 검증 로직 재사용
   */
  async login({ email, password }: IAuthService): Promise<string> {
    // DB에 등록되어있는 유저 확인
    const user = await this.usersService.findOneByEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('email이 존재 하지 않습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    /**
     * 유저도 존재하고 비밀번호도 맞으니 엑세스 토큰 발급(JWT 토큰)
     * -> accessToken(=JWT)을 만들어서 브라우저에 전달
     */
    return this.getAccessToken({ user });
  }
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의 비밀번호', expiresIn: '1h' },
    );
  }
}
