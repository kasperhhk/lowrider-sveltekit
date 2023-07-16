import { fail, redirect, type Actions } from '@sveltejs/kit';
import { createJwt } from '$lib/server/jwt';
import { MatchUserByPassword } from '$lib/server/user';

export const actions = {
  default: async ({ request, cookies, url }) => {
    const body = await request.formData();
    const username = body.get('username')?.toString();
    const password = body.get('password')?.toString();

    if (!username) {
      return fail(400, { username, usernameMissing: true });
    }
    if (!password) {
      return fail(400, { username, passwordMissing: true });
    }

    const user = await MatchUserByPassword(username, password);
    if (!user) {
      return fail(400, { username, incorrect: true });
    }

    const jwt = createJwt(user);
    cookies.set('lowrider_jwt', jwt, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 5
    });

    throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
  }
} satisfies Actions;