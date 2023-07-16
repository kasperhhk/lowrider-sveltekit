import type { Handle } from '@sveltejs/kit';
import { getSession } from './lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies } = event;
  const sessionId = cookies.get('sessionId');

  if (sessionId) {
    event.locals.session = getSession(sessionId);
  }

  
  if (!event.locals.session) cookies.delete('sessionId');

  return await resolve(event);
}