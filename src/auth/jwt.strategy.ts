import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // ✅ ConfigService 추가
// import Redis from 'ioredis'; // Redis 관련 코드 제거

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // private redisClient: Redis; // Redis 클라이언트 제거

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ 요청에서 JWT 추출
      ignoreExpiration: false, // ✅ 만료된 토큰 거부
      secretOrKey: configService.get<string>('JWT_SECRET'), // ✅ 환경변수에서 시크릿 키 가져오기
    });

    // this.redisClient = new Redis({ // Redis 클라이언트 초기화 제거
    //   host: configService.get<string>('REDIS_HOST', '127.0.0.1'),
    //   port: configService.get<number>('REDIS_PORT', 6379),
    //   password: configService.get<string>('REDIS_PASSWORD', ''),
    // });
  }

  async validate(payload: any) {
    // const userKey = `user:${payload.sub}`; // Redis 키 생성 제거
    // const user = await this.redisClient.get(userKey); // Redis에서 사용자 조회 제거

    // if (!user) { // Redis 사용자 검증 제거
    //   throw new UnauthorizedException('User not found');
    // }

    console.log('jwt payload', payload.sub);
    return payload.sub; // JWT의 sub 반환
  }
}
