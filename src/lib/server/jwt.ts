import * as jose from 'jose';
import type { User } from './user';
import { AUTH_RS256_PRIVATEKEY, AUTH_RS256_PUBLICKEY } from '$env/static/private';

const alg = 'RS256';

const keys = (function () {
  let privateCache: jose.KeyLike | null = null;
  const priv = async () => {
    if (privateCache === null)
      privateCache = await jose.importPKCS8(AUTH_RS256_PRIVATEKEY, alg);
    return privateCache;
  }

  let publicCache: jose.KeyLike | null = null;
  const pub = async () => {
    if (publicCache === null)
      publicCache = await jose.importSPKI(AUTH_RS256_PUBLICKEY, alg);
    return publicCache;
  };

  return {
    private: priv,
    public: pub
  };
})();



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
    .sign(await keys.private());

  return token;
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, await keys.public(), {
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