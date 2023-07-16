import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import type { User } from './user';
import { AUTH_RS256_PRIVATEKEY, AUTH_RS256_PUBLICKEY } from '$env/static/private';

export function createJwt(user: User) {
  const jwt = jwtSign(user, AUTH_RS256_PRIVATEKEY, {
    algorithm: 'RS256',
    expiresIn: '5m'
  });

  return jwt;
}

export function verifyJwt(jwt: string) {
  try {
    const { payload } = jwtVerify(jwt, AUTH_RS256_PUBLICKEY, {
      complete: true
    });
    const user = payload as User;
    return user;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}