import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// jwt 전략을 채택하기로 함
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  //PassportStrategy 에서 검증하는 것
  // 1. 비밀번호 검증
  // 2. 만료시간 검증
  constructor() {
    super({
      // 쿠키에서 토큰을 가져오는 함수
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToken=asldvknaslkdvjnasg
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      // accessToken      \
      secretOrKey: '나의리프레시비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); //  { sub: asljdvn, }
    // 리턴하는 순간 req.user객체의 id가 추가됨
    return {
      id: payload.sub, // req.user ->
    };
  }
}
