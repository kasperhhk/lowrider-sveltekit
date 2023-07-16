import jwt from 'jsonwebtoken';
import type { User } from './user';
import { AUTH_RS256_PRIVATEKEY, AUTH_RS256_PUBLICKEY } from '$env/static/private';

export function createJwt(user: User) {
  const token = jwt.sign(user, AUTH_RS256_PRIVATEKEY, {
    algorithm: 'RS256',
    expiresIn: '1d'
  });

  return token;
}

export function verifyJwt(token: string) {
  try {
    const { payload } = jwt.verify(token, AUTH_RS256_PUBLICKEY, {
      complete: true
    });
    console.log(payload);
    const user = payload as User;
    return user;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}