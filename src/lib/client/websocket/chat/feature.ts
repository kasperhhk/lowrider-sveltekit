import moment from 'moment';
import { currentUser, send as websocketSend } from '../client';
import { registerFeature } from '../messaging';
import { createChatClientMessage, type ChatUserMessage, type OutgoingChatUserMessage } from './messages';
import { chatMessages } from './stores';

const handlers = {
  ['CHATMSG']: handlerChatUserMessageFromWebsocket,
  onDisconnectedByServer,
  onConnectingToServer,
  onConnectedToServer
};

export const send = {
  chatMessage: (message: OutgoingChatUserMessage) => {
    websocketSend('CHAT', 'CHATMSG', message);
  }
}

function handlerChatUserMessageFromWebsocket(raw: string) {
  const msg = JSON.parse(raw) as ChatUserMessage;
  msg.type = 'CHAT:CHATMSG';
  msg.timestamp = moment();

  chatMessages.update(msgs => [...msgs, msg]);
}

function onDisconnectedByServer() {
  console.log("chat onclose");
  chatMessages.update(msgs => [...msgs, createChatClientMessage('Disconnected! Reconnecting...')]);
}

function onConnectingToServer() {
  chatMessages.update(msgs => [...msgs, createChatClientMessage('Connecting...')]);
}

function onConnectedToServer() {
  chatMessages.update(msgs => [...msgs, createChatClientMessage(`Connected as ${currentUser}!`)]);
}

export function setup() {
  registerFeature('CHAT', handlers);
}