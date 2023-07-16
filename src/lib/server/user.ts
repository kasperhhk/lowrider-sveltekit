import { sql } from '@vercel/postgres';

export interface User {
  username: string;
}

export async function MatchUserByPassword(username: string, password: string) {
  const result = await sql<User>`SELECT username FROM public.user u INNER JOIN public.user_auth ua ON ua.user_id = u.id WHERE u.username = ${username} AND ua.password = ${password} LIMIT 1`;
  return result.rowCount > 0 ? result.rows[0] : null;
}