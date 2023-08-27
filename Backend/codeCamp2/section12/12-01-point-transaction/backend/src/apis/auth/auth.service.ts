import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
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
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // DB에 등록되어있는 유저 확인
    const user = await this.usersService.findOneByEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('email이 존재 하지 않습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // refreshToken(=JWT)만들어서 리스폰스의 헤더에 <<<<<<브러우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });
    /**
     * 유저도 존재하고 비밀번호도 맞으니 엑세스 토큰 발급(JWT 토큰)
     * -> accessToken(=JWT)을 만들어서 브라우저에 전달
     */
    return this.getAccessToken({ user });
  }
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의 비밀번호', expiresIn: '30s' },
    );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    // 리프레쉬 토큰 생성
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );
    // console.log('response의 헤더에 넣어주자(개발환경)');
    // console.log(`리프레쉬 토근 -> ${refreshToken}`);
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
    // context.res.setHeader('Access-Control-Allow-Origin', 'https:/myfrontsite.com')
    // response의 헤더에 넣어줌(배포환경)
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`,);
  }
}
