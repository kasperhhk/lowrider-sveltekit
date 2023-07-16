import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { LOWRIDER_WEBSOCKET_HOST } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals, url, route }) => {
  const { user } = locals;
  
  if (!user) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const useLocalhost = !!url.searchParams.get('uselocalhost');
  const websocketServerHost = useLocalhost ? 'localhost:25565' : LOWRIDER_WEBSOCKET_HOST;
  const websocketServer = `wss://${websocketServerHost}/ws/`;
  return { username: user.username, websocketServer };
};