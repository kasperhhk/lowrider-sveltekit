import { writable } from 'svelte/store';
import type { ChatMessage } from './messages';

export const chatMessages = writable<ChatMessage[]>([]);