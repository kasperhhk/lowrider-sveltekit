import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  cookies.delete('lowrider_jwt');

  throw redirect(303, '/login');
};