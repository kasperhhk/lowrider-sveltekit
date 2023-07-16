import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const { user } = locals;

  if (!user) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return { username: user.username };
};