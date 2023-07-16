import type { Moment } from 'moment';
import moment from 'moment';

export type ChatMessage = ChatClientMessage | ChatUserMessage;

export interface ChatClientMessage {
  type: 'chatclientmessage';
  message: string;
  timestamp: Moment;
}

export function createChatClientMessage(message: string) {
  return { message, timestamp: moment(), type: 'chatclientmessage' } as ChatClientMessage;
}

export interface ChatUserMessage {
  type: 'CHAT:CHATMSG';
  user: string;
  message: string;
  timestamp: Moment;
}

export interface OutgoingChatUserMessage {
  message: string;
}