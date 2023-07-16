import { fail, redirect, type Actions } from '@sveltejs/kit';
import { users, createSession } from '$lib/auth';

export const actions = {
  default: async ({ request, cookies, url }) => {
    const body = await request.formData();
    const username = body.get('username');
    const password = body.get('password');    
    const user = users.find(_ => _.username === username);

    if (user && user.password === password) {
      const session = createSession(user);
      cookies.set('sessionId', session.sessionId, {
        path: '/',
        sameSite: 'lax'
      });
      throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
    }

    return fail(400, { username, incorrect: true });
  }
} satisfies Actions;