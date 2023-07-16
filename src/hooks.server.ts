import type { Handle } from '@sveltejs/kit';
import { verifyJwt } from '$lib/server/jwt';

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies } = event;
  const jwt = cookies.get('lowrider_jwt');
  if (jwt) {
    const user = verifyJwt(jwt);
    if (user) {
      event.locals.user = user;
    }
    else {
      cookies.delete('lowrider_jwt');
    }
  }

  return await resolve(event);
}