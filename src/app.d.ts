// See https://kit.svelte.dev/docs/types#app

import type { Session } from './lib/auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      session?: Session;
    }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
