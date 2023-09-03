import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// jwt 전략을 채택하기로 함
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  //PassportStrategy 에서 검증하는 것
  // 1. 비밀번호 검증
  // 2. 만료시간 검증
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     const temp = req.header.Authorization; // Bearer asldvknaslkdvjnasg
      //     const accessToken = temp.lowercase().replace('beaer ', '')
      //     return accessToken;
      //   } // accessToken
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의 비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); //  { sub: asljdvn, }
    return {
      id: payload.sub, // req.user ->
    };
  }
}
