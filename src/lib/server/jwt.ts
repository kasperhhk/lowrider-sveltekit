import * as jose from 'jose';
import type { User } from './user';
import { AUTH_RS256_PRIVATEKEY, AUTH_RS256_PUBLICKEY } from '$env/static/private';

const alg = 'RS256';
const privateKey = await jose.importPKCS8(AUTH_RS256_PRIVATEKEY, alg);
const publicKey = await jose.importSPKI(AUTH_RS256_PUBLICKEY, alg);

function mapToPayload(user: User) {
  return {
    'lowrider_username': user.username
  };
}

function mapToUser(payload: jose.JWTPayload) {
  return {
    username: payload['lowrider_username']
  } as User;
}

export async function createJwt(user: User) {
  const payload = mapToPayload(user);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(privateKey);

  return token;
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, publicKey, {
      requiredClaims: ['lowrider_username'],
      maxTokenAge: '1d'
    });
    return mapToUser(payload);
  }
  catch (err) {
    console.error(err);
    return null;
  }
}