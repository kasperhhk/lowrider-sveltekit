import { deleteSession } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  const sessionId = cookies.get('sessionId');
  deleteSession(sessionId);
  cookies.delete('sessionId');

  throw redirect(303, '/login');
};