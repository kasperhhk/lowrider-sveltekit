import { sql } from '@vercel/postgres';
import { dev } from '$app/environment';

export interface User {
  username: string;
}

export async function MatchUserByPassword(username: string, password: string) {
  // Save db resources, i know what the usernames are pepelaff
  if (username !== 'kasper' && username !== 'ellie')
    return null;

  if (dev) {
    return {
      username: 'kasper'
    } as User;
  }

  const result = await sql<User>`SELECT username FROM public.user u INNER JOIN public.user_auth ua ON ua.user_id = u.id WHERE u.username = ${username} AND ua.password = ${password} LIMIT 1`;
  return result.rowCount > 0 ? result.rows[0] : null;
}